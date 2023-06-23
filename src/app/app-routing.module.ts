import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { PreviewUserComponent } from './users/preview-user/preview-user.component';
import { PageNotFoundComponent } from './common/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent, children: [
    { path: ':userId', component: PreviewUserComponent }
  ] },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
