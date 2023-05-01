import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QListComponent } from './q-list/q-list.component';
import { QCreateComponent } from './q-create/q-create.component';
import { QUpdateComponent } from './q-update/q-update.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule, ButtonModule, GridModule, FormModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';


@NgModule({
  declarations: [
    QListComponent,
    QCreateComponent,
    QUpdateComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    NgxPaginationModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class QuestionModule { }
