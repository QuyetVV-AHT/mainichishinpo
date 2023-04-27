import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QListComponent } from './q-list/q-list.component';
import { QCreateComponent } from './q-create/q-create.component';
import { QUpdateComponent } from './q-update/q-update.component';


@NgModule({
  declarations: [
    QListComponent,
    QCreateComponent,
    QUpdateComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule
  ]
})
export class QuestionModule { }
