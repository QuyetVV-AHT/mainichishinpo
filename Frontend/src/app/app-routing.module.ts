import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './Dashboard/board-admin/board-admin.component';
import { BoardExamComponent } from './Dashboard/board-exam/board-exam.component';
import { BoardModeratorComponent } from './Dashboard/board-moderator/board-moderator.component';
import { BoardUserComponent } from './Dashboard/board-user/board-user.component';
import { ExamCreateComponent } from './exam/exam-create/exam-create.component';
import { ExamPublicComponent } from './exam/exam-public/exam-public.component';
import { ExamStartComponent } from './exam/exam-start/exam-start.component';
import { ExamUpdateQuestionComponent } from './exam/exam-update-question/exam-update-question.component';
import { ExamUpdateComponent } from './exam/exam-update/exam-update.component';
import { ExamViewComponent } from './exam/exam-view/exam-view.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionCreateComponent } from './question/question-create/question-create.component';
import { QuestionUpdateComponent } from './question/question-update/question-update.component';
import { RegisterComponent } from './register/register.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },

  { path: 'admin', component: BoardAdminComponent },
  // USER
  { path: 'user', component: BoardUserComponent },
  { path: 'update-user/:id', component: UserUpdateComponent },
  { path: 'user-create', component: UserCreateComponent },

  // Question
  { path: 'question', component: BoardModeratorComponent },
  { path: 'question-create', component: QuestionCreateComponent },
  { path: 'update-question/:id', component: QuestionUpdateComponent },

  // Exam
  { path: 'exam', component: BoardExamComponent },
  { path: 'exam-create', component: ExamCreateComponent },
  { path: 'update-exam/:id', component: ExamUpdateComponent },
  { path: 'view-exam/:id', component: ExamViewComponent },
  { path: 'update-question-by-examId/:id', component: ExamUpdateQuestionComponent },
  { path: 'exam-public', component: ExamPublicComponent },
  { path: 'examStart/:id', component: ExamStartComponent },


  { path: '', redirectTo: 'home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
