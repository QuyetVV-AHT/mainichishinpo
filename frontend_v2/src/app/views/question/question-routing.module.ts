import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QCreateComponent } from './q-create/q-create.component';
import { QListComponent } from './q-list/q-list.component';
import { QUpdateComponent } from './q-update/q-update.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Câu hỏi',
    },
    children: [
      {
        path: 'list',
        component: QListComponent,
        data: {
          title: 'Danh sách câu hỏi',
        },
      },
      {
        path: 'create',
        component: QCreateComponent,
        data: {
          title: 'Tạo mới câu hỏi',
        },
      },
      {
        path: 'update/:id',
        component: QUpdateComponent,
        data: {
          title: 'Chỉnh sửa câu hỏi',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
