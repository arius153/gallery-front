import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { ImagesSearchComponent } from './images-search/images-search.component';
import { AddImageComponent } from './add-image/add-image.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component'; 
import { AuthGuard } from './_helpers/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'images/:id', component: ImageDetailComponent, canActivate: [AuthGuard]},
  { path: 'search', component: ImagesSearchComponent, canActivate: [AuthGuard] },
  { path: 'search/:searchParam', component: ImagesSearchComponent, canActivate: [AuthGuard]},
  { path: 'addimage', component: AddImageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LogInComponent},
  { path: 'signup', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
