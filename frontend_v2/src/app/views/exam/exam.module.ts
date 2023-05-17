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
import { ResutlUserComponent } from './resutl-user/resutl-user.component';
import { TableModule, UtilitiesModule } from '@coreui/angular';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { EStartAudioFillwordComponent } from '../exam/e-start-audio-fillword/e-start-audio-fillword.component'
import { EStartFillwordComponent } from '../exam/e-start-fillword/e-start-fillword.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    ECreateComponent,
    EListComponent,
    EUpdateComponent,
    ImportExcelComponent,
    EStartComponent,
    ResutlUserComponent,
    EStartAudioFillwordComponent,
    EStartFillwordComponent
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
    FormsModule,
    TableModule,
    UtilitiesModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    NgxMatFileInputModule,
    NgxYoutubePlayerModule.forRoot(),
    CommonModule,
    NgxAudioPlayerModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ExamModule { }
platformBrowserDynamic().bootstrapModule(ExamModule);
