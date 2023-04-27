import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },

  {
    name: 'Quản lý',
    title: true
  },
  // User
  {
    name: 'Người dùng',
    url: '/user',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Danh sách',
        url: '/user/list'
      },
      {
        name: 'Tạo mới',
        url: '/user/create'
      },
      // {
      //   name: 'Chỉnh sửa',
      //   url: '/user/update'
      // },
    ]
  },
  // Post
  {
    name: 'Bài viết',
    url: '/post',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Danh sách',
        url: '/post/list'
      },
      {
        name: 'Tạo mới',
        url: '/post/create'
      },
      // {
      //   name: 'Chỉnh sửa',
      //   url: '/post/update'
      // },
    ]
  },

  // Question
  {
    name: 'Câu hỏi',
    url: '/question',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Danh sách',
        url: '/question/list'
      },
      {
        name: 'Tạo mới',
        url: '/question/create'
      },
      {
        name: 'Chỉnh sửa',
        url: '/question/update'
      },
    ]
  },

    // Exam
    {
      name: 'Đề thi',
      url: '/exam',
      iconComponent: { name: 'cil-cursor' },
      children: [
        {
          name: 'Danh sách',
          url: '/exam/list'
        },
        {
          name: 'Tạo mới',
          url: '/exam/create'
        },
        {
          name: 'Chỉnh sửa',
          url: '/exam/update'
        },
      ]
    },

  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login'
      },
      {
        name: 'Register',
        url: '/register'
      },
      {
        name: 'Error 404',
        url: '/404'
      },
      {
        name: 'Error 500',
        url: '/500'
      }
    ]
  },
];
