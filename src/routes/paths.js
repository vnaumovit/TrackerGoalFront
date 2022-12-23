// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_PAGE = {
  page404: '/404',
  page500: '/500'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  tasks: {
    root: path(ROOTS_DASHBOARD, '/tasks'),
    list: path(ROOTS_DASHBOARD, '/tasks/list'),
  },
  goals: {
    root: path(ROOTS_DASHBOARD, '/goals'),
    list: path(ROOTS_DASHBOARD, '/goals/list'),
    new: path(ROOTS_DASHBOARD, '/goals/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/goals/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/goals/${id}/edit`),
  },
  habits: {
    root: path(ROOTS_DASHBOARD, '/habits'),
    list: path(ROOTS_DASHBOARD, '/habits/list'),
    new: path(ROOTS_DASHBOARD, '/habits/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/habits/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/habits/${id}/edit`),
  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
