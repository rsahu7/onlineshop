import { Component, OnInit } from '@angular/core';
//import { OktaAuthStateService } from '@okta/okta-angular';
//import { OktaAuth } from '@okta/okta-auth-js';

//import * as OktaSignIn from '@okta/okta-signin-widget/dist/js/okta-sign-in.min.js';
import myAppConfig from 'src/app/config/my-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //oktaSignin: any;
  
  // constructor(private oktaAuthService:  OktaAuthStateService,
  //              private oktaAuth: OktaAuth) { 
  //   this.oktaSignin = new OktaSignIn({
  //     logo: 'assets/images/logo.png',
  //     features: {
  //       registration: true
  //     },
  //     baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
  //     clientId: myAppConfig.oidc.clientId,
  //     redirectUri: myAppConfig.oidc.redirectUri,
  //     authParams: {
  //       pkce: true,
  //       issuer: myAppConfig.oidc.issuer,
  //       scopes: myAppConfig.oidc.scopes
  //     }
  //   });
  // }

  constructor() {
    
  }

  ngOnInit(): void {
    // this.oktaSignin.remove();

    // this.oktaSignin.renderEl({
    //   el:'#okta-sign-in-widget'},
    //   (response: any) => {
    //     if (response.status === 'SUCCESS') {
    //       this.oktaAuth.signInWithRedirect();
    //     }
    //    },
    //    (error: any) => {
    //      throw error;
    //    }
    // );
  }

}
