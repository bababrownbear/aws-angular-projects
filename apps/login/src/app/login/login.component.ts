import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CognitoCallback, LoggedInCallback } from "@aws-angular-projects/aws-cognito-angular-quickstart/src/cognito.service";
import { DynamoDBService } from "@aws-angular-projects/aws-cognito-angular-quickstart/src/ddb.service";
import { UserLoginService } from "@aws-angular-projects/aws-cognito-angular-quickstart/src/user-login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements CognitoCallback, LoggedInCallback, OnInit {
  email: string;
  password: string;
  errorMessage: string;

  constructor(public router: Router,
    public ddb: DynamoDBService,
    public userService: UserLoginService) {
    console.log("LoginComponent constructor");
  }

  ngOnInit() {
    this.errorMessage = null;
    console.log("Checking if the user is already authenticated. If so, then redirect to the secure site");
    this.userService.isAuthenticated(this);
  }

  onLogin() {
    if (this.email == null || this.password == null) {
      this.errorMessage = "All fields are required";
      return;
    }
    this.errorMessage = null;
    this.userService.authenticate(this.email, this.password, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) { // error
      this.errorMessage = message;
      console.log("result: " + this.errorMessage);
      if (this.errorMessage === 'User is not confirmed.') {
        console.log("redirecting");
        this.router.navigate(['/home/confirmRegistration', this.email]);
      } else if (this.errorMessage === 'User needs to set password.') {
        console.log("redirecting to set new password");
        this.router.navigate(['/home/newPassword']);
      }
    } else { // success
      this.ddb.writeLogEntry("login");
      this.router.navigate(['/securehome']);
    }
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.router.navigate(['/securehome']);
    }
  }
}
