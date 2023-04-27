import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PCreateComponent } from './p-create/p-create.component';
import { PListComponent } from './p-list/p-list.component';
import { PUpdateComponent } from './p-update/p-update.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Bài viết',
    },
    children: [
      {
        path: 'list',
        component: PListComponent,
        data: {
          title: 'Danh sách bài viết',
        },
      },
      {
        path: 'create',
        component: PCreateComponent,
        data: {
          title: 'Tạo mới bài viết',
        },
      },
      {
        path: 'update/:id',
        component: PUpdateComponent,
        data: {
          title: 'Chỉnh sửa bài viết',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
