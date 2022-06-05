import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const TodoAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: [
        '/apps/todo/:filter/:label/:todoId?',
        '/apps/todo/:filter/:todoId?',
        // '/apps/todo/:folder/:todoId?',
      ],
      component: lazy(() => import('./TodoApp')),
    },
    {
      path: '/apps/todo',
      component: () => <Redirect to="/apps/todo/all" />,
    },
  ],
};

export default TodoAppConfig;
