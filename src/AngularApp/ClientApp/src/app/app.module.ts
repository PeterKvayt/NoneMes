import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Components.
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { InputTextComponent } from './components/input-text/input-text.component';

// Views.
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegistrationComponent } from './views/registration/registration.component';
import { MessagesComponent } from './views/messages/messages.component';
import { ConversationComponent } from './views/conversation/conversation.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
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
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'registration', component: RegistrationComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'conversation', component: ConversationComponent },
      { path: '**', component: LoginComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
