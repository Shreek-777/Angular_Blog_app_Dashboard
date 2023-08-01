import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule,} from '@angular/fire/compat';
import { FirestoreModule,} from '@angular/fire/firestore'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { environment } from 'src/environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewCategoryComponent } from './new-category/new-category.component';
import { AllpostComponent } from './Components/allpost/allpost.component';
import { NewpostComponent } from './Components/newpost/newpost.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LoginComponent } from './Components/login/login.component';
import { AboutComponent } from './Layout/about/about.component';
import { ContactusComponent } from './Layout/contactus/contactus.component';
import { TermAndConditionComponent } from './Layout/term-and-condition/term-and-condition.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    NewCategoryComponent,
    NewCategoryComponent,
    AllpostComponent,
    NewpostComponent,
    LoginComponent,
    AboutComponent,
    ContactusComponent,
    TermAndConditionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FirestoreModule,
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  exports:[FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
