import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomescreenComponent } from '../app/components/homescreen/homescreen.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { AdminticketComponent } from './components/adminticket/adminticket.component';
import { AdmingroupComponent } from './components/admingroup/admingroup.component';
import { AdmincategoryComponent } from './components/admincategory/admincategory.component';
import { AdminaddmemberComponent } from './components/adminaddmember/adminaddmember.component';
import { AdminviewmemberbygroupidComponent } from './components/adminviewmemberbygroupid/adminviewmemberbygroupid.component';
const routes: Routes = [
  {path:'', component:HomescreenComponent},
  {path:'signup',component:SignupComponent},
  {path:'adminhome',component:AdminhomeComponent},
  {path:'adminticket',component:AdminticketComponent},
  {path:'admingroup',component:AdmingroupComponent},
  {path:'admincategory',component:AdmincategoryComponent},
  {path:'adminaddmember',component:AdminaddmemberComponent},
  {path:'adminviewmemberbygroupid',component:AdminviewmemberbygroupidComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

