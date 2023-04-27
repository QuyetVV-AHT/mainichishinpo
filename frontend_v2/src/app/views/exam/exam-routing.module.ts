import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ECreateComponent } from './e-create/e-create.component';
import { EListComponent } from './e-list/e-list.component';
import { EUpdateComponent } from './e-update/e-update.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Đề thi',
    },
    children: [
      {
        path: 'list',
        component: EListComponent,
        data: {
          title: 'Danh sách đề thi',
        },
      },
      {
        path: 'create',
        component: ECreateComponent,
        data: {
          title: 'Tạo mới đề thi',
        },
      },
      {
        path: 'update',
        component: EUpdateComponent,
        data: {
          title: 'Chỉnh sửa đề thi',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
