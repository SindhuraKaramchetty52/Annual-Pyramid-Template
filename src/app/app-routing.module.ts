import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { RevgrowthComponent } from './revgrowth/revgrowth.component';
import { SubHomeComponent } from './sub-home/sub-home.component';

const routes: Routes = [
  {path:"Home",component:HomeComponent},
  {path:"RevGrowth",component:RevgrowthComponent},
  {path:'',redirectTo:"/Home",pathMatch:"full"},
  {path:'**',component:SubHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
