import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ECreateComponent } from './e-create/e-create.component';
import { EListComponent } from './e-list/e-list.component';
import { EStartComponent } from './e-start/e-start.component';
import { EUpdateComponent } from './e-update/e-update.component';
import { ImportExcelComponent } from './import-excel/import-excel.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '試験',
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
        path: 'update/:id',
        component: EUpdateComponent,
        data: {
          title: 'Chỉnh sửa đề thi',
        },
      },
      {
        path: 'import-excel',
        component: ImportExcelComponent,
        data: {
          title: 'Thêm đề thi từ file excel',
        },
      },
      {
        path: 'start-exam/:id',
        component: EStartComponent,
        data: {
          title: '始めて',
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
