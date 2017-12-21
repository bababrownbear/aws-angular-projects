import { UserParametersService } from './user-parameters.service';
import { UserLoginService } from './user-login.service';
import { UserRegistrationService } from './user-registration.service';
import { DynamoDBService } from './ddb.service';
import { AwsUtil } from './aws.service';
import { CognitoUtil } from './cognito.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  providers: [
    CognitoUtil,
    AwsUtil,
    DynamoDBService,
    UserRegistrationService,
    UserLoginService,
    UserParametersService]
})
export class AwsCognitoAngularQuickstartModule { }
