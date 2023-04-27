import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PUpdateComponent } from './p-update/p-update.component';
import { PCreateComponent } from './p-create/p-create.component';
import { PListComponent } from './p-list/p-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule, ButtonModule, GridModule, FormModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';


@NgModule({
  declarations: [
    PCreateComponent,
    PListComponent,
    PUpdateComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
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
export class PostModule { }
