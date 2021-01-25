
import { Injectable, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataService } from './common/loading/data.service';
import { LoadingComponent } from './common/loading/loading.component';
import { LoadingInterceptor } from './common/loading/loading.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingService } from './common/loading/loading.service';
import { DashboardBusinessLogic } from './businessLogic/dashboardLogic';
import { OVERLAY_PROVIDERS } from '@angular/cdk/overlay';
import { SearchFilterPipe } from './common/searchfilter.pipe';
import { FormsModule } from '@angular/forms';

@Injectable()
export class NoCacheHeadersInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authReq = req.clone({
            setHeaders: {
                'Cache-Control': 'no-cache',
                 Pragma: 'no-cache'
            }
        });
        return next.handle(authReq);    
    }
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoadingComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService,LoadingService,OVERLAY_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoCacheHeadersInterceptor,
      multi: true
    },DashboardBusinessLogic
  ],
  entryComponents: [LoadingComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }