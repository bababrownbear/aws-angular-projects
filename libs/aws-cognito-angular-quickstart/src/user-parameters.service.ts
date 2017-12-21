import { Injectable } from '@angular/core';
import { Callback, CognitoUtil } from './cognito.service';

@Injectable()
export class UserParametersService {
  constructor(public cognitoUtil: CognitoUtil) {}

  getParameters(callback: Callback) {
    const cognitoUser = this.cognitoUtil.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function(sessionError, session) {
        if (sessionError) {
          console.log("UserParametersService: Couldn't retrieve the user");
        } else {
          cognitoUser.getUserAttributes(function(userAttributeError, result) {
            if (userAttributeError) {
              console.log('UserParametersService: in getParameters: ' + userAttributeError);
            } else {
              callback.callbackWithParam(result);
            }
          });
        }
      });
    } else {
      callback.callbackWithParam(null);
    }
  }
}
