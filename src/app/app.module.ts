import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ImagesSearchComponent } from './images-search/images-search.component';
import { AddImageComponent } from './add-image/add-image.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsernameTakenDirective } from './_directives/username-taken.directive';
import { PasswordMatchDirective } from './_directives/password-match.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    ImageDetailComponent,
    NavigationComponent,
    ImagesSearchComponent,
    AddImageComponent,
    LogInComponent,
    SignUpComponent,
    UsernameTakenDirective,
    PasswordMatchDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule, 
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
