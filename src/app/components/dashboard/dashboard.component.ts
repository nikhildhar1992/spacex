import { Component, OnChanges, OnInit } from '@angular/core';
import { DashboardBusinessLogic } from 'src/app/businessLogic/dashboardLogic';
import { SearchFilterPipe } from 'src/app/common/searchfilter.pipe';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public spaceXDataYears = [];
  public spaceXData = [];
  public searchYear = "";
  public searchLaunchSuccess = "";
  public yearParam;
  public launchParam;
  public yearItemClicked;
  public launchItemClicked;
  constructor(public dashboardBal: DashboardBusinessLogic,private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.dashboardBal.getAllSpaceData().subscribe(data => {
    //   this.spaceXData = data;
    // })
    this.spaceXData = this.dashboardBal.getData();
    this.spaceXDataYears = JSON.parse(JSON.stringify(this.spaceXData));
    this.paramUpdated()
  }

  paramUpdated() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.yearParam = queryParams.get("search");
      this.launchParam = queryParams.get("searchLaunch");

      if(this.launchParam && this.launchParam == 'launch_success_true' || this.launchParam == 'launch_success_false') {
        let param = this.launchParam.split('_');
        this.launchItemClicked = param[2].toLocaleLowerCase();
        if(param[2].toLocaleLowerCase()=='true' || param[2].toLocaleLowerCase()=='false'){
          if (this.yearParam) {
            let YParam = this.yearParam.split('_');
            this.yearItemClicked = Number(YParam[1]);
            if (YParam.length > 1) {
              if (YParam[0] == 'launchyear') {
                this.spaceXData = this.spaceXDataYears.filter(item => {
                  if((Number(item.launch_year) == Number(YParam[1])) && item.launch_success+"" == param[2]) 
                    return item;
                });
              }
            }
          }else{
            this.spaceXData = this.spaceXDataYears.filter(item => item.launch_success+"" == param[2]);
          }
        }
      }else if(this.yearParam){
        let param = this.yearParam.split('_');
        this.yearItemClicked = Number(param[1]);
        if(param.length > 1) {
          if(param[0] == 'launchyear') {
            this.spaceXData = this.spaceXDataYears.filter(item => Number(item.launch_year) == Number(param[1]));
          }
        }
      }else {
        this.spaceXData = JSON.parse(JSON.stringify(this.spaceXDataYears));
      }
    })
  }

  searchItem(searchType,searchItem) {
    if(searchType == 'launch_success_') {
      if(this.launchItemClicked == searchItem){
        this.launchItemClicked = "";
        if(this.yearItemClicked != ""){
          window.location.replace('#/dashboard?search='+"launchyear_"+this.yearItemClicked);
        }else{
          window.location.replace('#/dashboard');
        }
      }else{
        this.launchItemClicked = searchItem;
        if(this.yearItemClicked) {
          window.location.replace('#/dashboard?searchLaunch='+searchType+searchItem+"&search=launchyear_"+this.yearItemClicked);  
        }else {
          window.location.replace('#/dashboard?searchLaunch='+searchType+searchItem);
        }
      }
      this.paramUpdated();
    }else if(searchType == 'launchyear_') {
      if(this.yearItemClicked == searchItem){
        this.yearItemClicked = "";
        if(this.launchItemClicked != ""){
          window.location.replace('#/dashboard?searchLaunch='+"launch_success_"+this.launchItemClicked);
        }else{
          window.location.replace('#/dashboard');
        }
      }else{
        this.yearItemClicked = searchItem;
        if(this.launchItemClicked){
          window.location.replace('#/dashboard?search='+searchType+searchItem+"&searchLaunch=launch_success_"+this.launchItemClicked);
        }else {
          window.location.replace('#/dashboard?search='+searchType+searchItem);
        }
      }
      this.paramUpdated();
    }
  }
}