import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AwsCognitoAngularQuickstartModule } from '@aws-angular-projects/aws-cognito-angular-quickstart';

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    FormsModule,
    RouterModule.forRoot([{ path: "", component: LoginComponent }]),
    AwsCognitoAngularQuickstartModule
  ],
  declarations: [AppComponent, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
