import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllpostComponent } from './Components/allpost/allpost.component';
import { LoginComponent } from './Components/login/login.component';
import { NewpostComponent } from './Components/newpost/newpost.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './Layout/about/about.component';
import { ContactusComponent } from './Layout/contactus/contactus.component';
import { TermAndConditionComponent } from './Layout/term-and-condition/term-and-condition.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { AuthGuard } from './Services/auth.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent , canActivate:[AuthGuard]},
  {path:'categories', component:NewCategoryComponent , canActivate:[AuthGuard]},
  {path:'posts',component:AllpostComponent, canActivate:[AuthGuard]},
  {path:'posts/new',component:NewpostComponent, canActivate:[AuthGuard]},
  {path:'about',component:AboutComponent},
  {path:'terms',component:TermAndConditionComponent},
  {path:'contactus',component:ContactusComponent , canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
