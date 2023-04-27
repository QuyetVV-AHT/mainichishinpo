import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UCreateComponent } from './u-create/u-create.component';
import { UListComponent } from './u-list/u-list.component';
import { UUpdateComponent } from './u-update/u-update.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Người dùng',
    },
    children: [
      {
        path: 'list',
        component: UListComponent,
        data: {
          title: 'Danh sách người dùng',
        },
      },
      {
        path: 'create',
        component: UCreateComponent,
        data: {
          title: 'Tạo mới người dùng',
        },
      },
      {
        path: 'update/:id',
        component: UUpdateComponent,
        data: {
          title: 'Chỉnh sửa người dùng',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
