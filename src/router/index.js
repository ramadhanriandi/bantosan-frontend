import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/change-password',
    name: 'changePassword',
    component: () => import('../views/ChangePassword.vue'),
  },
  {
    path: '/disasters',
    name: 'disasters',
    component: () => import('../views/DisasterList.vue'),
  },
  {
    path: '/donation-history',
    name: 'donationHistory',
    component: () => import('../views/DonationHistory.vue'),
  },
  {
    path: '/fundraisings',
    name: 'fundraisings',
    component: () => import('../views/FundraisingList.vue'),
  },
  {
    path: '/fundraisings/:id',
    name: 'fundraisingDetail',
    component: () => import('../views/FundraisingDetail.vue'),
  },
  {
    path: '/fundraising-list',
    name: 'fundraisingList',
    component: () => import('../views/FundraisingDashboard.vue'),
  },
  {
    path: '/fundraising-list/:id',
    name: 'fundraisingListDetail',
    component: () => import('../views/FundraisingDetail.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/reported-disasters',
    name: 'reportedDisasters',
    component: () => import('../views/DisasterDashboard.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/user-list',
    name: 'userList',
    component: () => import('../views/UserList.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
