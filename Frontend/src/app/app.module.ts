import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { BoardAdminComponent } from './Dashboard/board-admin/board-admin.component';
import { BoardModeratorComponent } from './Dashboard/board-moderator/board-moderator.component';
import { BoardUserComponent } from './Dashboard/board-user/board-user.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToastrModule } from 'ngx-toastr';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { QuestionCreateComponent } from './question/question-create/question-create.component';
import { QuestionUpdateComponent } from './question/question-update/question-update.component';
import { BoardExamComponent } from './Dashboard/board-exam/board-exam.component';
import { ExamUpdateComponent } from './exam/exam-update/exam-update.component';
import { ExamCreateComponent } from './exam/exam-create/exam-create.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { ExamViewComponent } from './exam/exam-view/exam-view.component';
import { ExamUpdateQuestionComponent } from './exam/exam-update-question/exam-update-question.component';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    UserUpdateComponent,
    UserCreateComponent,
    QuestionCreateComponent,
    QuestionUpdateComponent,
    BoardExamComponent,
    ExamUpdateComponent,
    ExamCreateComponent,
    QuestionListComponent,
    ExamViewComponent,
    ExamUpdateQuestionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    NgxPaginationModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 8000, // 3 seconds
      progressBar: true,
    }),
    MatCheckboxModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
