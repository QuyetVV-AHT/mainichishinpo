import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UCreateComponent } from './u-create/u-create.component';
import { UListComponent } from './u-list/u-list.component';
import { UUpdateComponent } from './u-update/u-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule, ButtonModule, GridModule, FormModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    UCreateComponent,
    UListComponent,
    UUpdateComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CommonModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ReactiveFormsModule,
    NgxPaginationModule,

  ]
})
export class UserModule { }
