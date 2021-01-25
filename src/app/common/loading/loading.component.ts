import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent {
  message: string;
  constructor(private data: DataService) {
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }
}