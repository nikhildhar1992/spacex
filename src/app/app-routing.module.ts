import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: "dashboard/:search/:searchLaunch", component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: true
});