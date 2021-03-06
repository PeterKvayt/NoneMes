import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { JwtModule } from '@auth0/angular-jwt';

// Components.
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { InputTextComponent } from './components/input-text/input-text.component';

// Views.
import { AppComponent } from './app.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { RegistrationComponent } from './views/registration/registration.component';
import { MessagesComponent } from './views/messages/messages.component';
import { ConversationComponent } from './views/conversation/conversation.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';

import { AuthenticationGuardService } from './services/AuthenticationGuardService';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SignInComponent,
    InputTextComponent,
    RegistrationComponent,
    MessagesComponent,
    ConversationComponent,
    InputPasswordComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: SignInComponent, pathMatch: 'full' },
      { path: 'signIn', component: SignInComponent, pathMatch: 'full' },
      { path: 'registration', component: RegistrationComponent },
      { path: 'messages', component: MessagesComponent, canActivate: [AuthenticationGuardService] },
      { path: 'conversation/:id', component: ConversationComponent, canActivate: [AuthenticationGuardService] },
      { path: '**', component: SignInComponent }
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => sessionStorage.getItem('authToken'),
      }
    })
  ],
  providers: [AuthenticationGuardService],
  bootstrap: [AppComponent]
})

export class AppModule { }
