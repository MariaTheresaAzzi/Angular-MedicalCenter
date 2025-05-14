import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { TableComponent } from './components/table/table.component';
import { TabledocComponent } from './components/tabledoc/tabledoc.component';
import { FormdocComponent } from './components/formdoc/formdoc.component';
import { FormpatientComponent } from './components/formpatient/formpatient.component';
import { ViewpatComponent } from './components/viewpat/viewpat.component';
import { ViewdocComponent } from './components/viewdoc/viewdoc.component';
import { EditdocComponent } from './components/editdoc/editdoc.component';
import { EditpatComponent } from './components/editpat/editpat.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'doctor', component: TabledocComponent},
    {path: 'createdoctor', component: FormdocComponent},
    {path: 'patient', component: TableComponent},
    {path: 'createpatient', component: FormpatientComponent},
    {path: 'patient/:id', component: ViewpatComponent},
    {path: 'doctor/:id', component: ViewdocComponent},
    {path: 'editdoctor/:id', component: EditdocComponent},
    {path: 'editpatient/:id', component: EditpatComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
    {path: '**', redirectTo: 'login'},
];
