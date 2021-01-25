import { Injectable } from '@angular/core';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    public path = "http://api.spacexdata.com/v3/launches?limit=100";
    constructor(public baseService: BaseService){}
    getAllSpaceData() {
        return this.baseService.get(this.path,{});
    }
}