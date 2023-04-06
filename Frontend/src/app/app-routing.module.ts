import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './Dashboard/board-admin/board-admin.component';
import { BoardModeratorComponent } from './Dashboard/board-moderator/board-moderator.component';
import { BoardUserComponent } from './Dashboard/board-user/board-user.component';
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


  { path: '', redirectTo: 'home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
