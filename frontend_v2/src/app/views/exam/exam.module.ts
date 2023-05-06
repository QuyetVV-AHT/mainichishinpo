import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { ECreateComponent } from './e-create/e-create.component';
import { EListComponent } from './e-list/e-list.component';
import { EUpdateComponent } from './e-update/e-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule, ButtonModule, GridModule, FormModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { EStartComponent } from './e-start/e-start.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ECreateComponent,
    EListComponent,
    EUpdateComponent,
    ImportExcelComponent,
    EStartComponent,
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ExamModule { }
