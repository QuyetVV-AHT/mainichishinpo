import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'ダッシュボード',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },

  {
    name: '管理',
    title: true
  },
  // User
  {
    name: 'ユーザー',
    url: '/user',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: '一覧',
        url: '/user/list'
      },
      {
        name: '新規',
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
    name: 'ブログ',
    url: '/post',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: '一覧',
        url: '/post/list'
      },
      {
        name: '新規',
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
    name: '質問',
    url: '/question',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: '一覧',
        url: '/question/list'
      },
      {
        name: '新規',
        url: '/question/create'
      },
      // {
      //   name: 'Chỉnh sửa',
      //   url: '/question/update'
      // },
    ]
  },

    // Exam
    {
      name: '試験',
      url: '/exam',
      iconComponent: { name: 'cil-cursor' },
      children: [
        {
          name: '一覧',
          url: '/exam/list'
        },
        {
          name: '新規',
          url: '/exam/create'
        },
        {
          name: 'Import Excel',
          url: '/exam/import-excel'
        },
        // {
        //   name: '試験を開始',
        //   url: '/exam/start-exam/:id'
        // },
        // {
        //   name: '試験結果',
        //   url: '/exam/result-user'
        // },
      ]
    },

  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'ページ',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'ログイン',
        url: '/login'
      },
      {
        name: '新規登録',
        url: '/register'
      },
      {
        name: 'ログアウト',
        url: '/logout'
      },
      {
        name: 'エラー 404',
        url: '/404'
      },
      {
        name: 'エラー 500',
        url: '/500'
      }
    ]
  },
];
