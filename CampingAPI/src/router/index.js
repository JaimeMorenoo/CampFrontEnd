import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Booking from '../views/Booking.vue';
import Owner from '../views/Owner.vue';
import Login from '../views/Login.vue';
import User from '../views/User.vue';
import UserProfile from '../components/UserProfile.vue';
import UserSpots from '../components/UserSpots.vue'; // Create this component
import UserBookings from '../components/UserBookings.vue'; // Create this component
import test from '../views/test.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    { path: '/booking', component: Booking },
    { path: '/owner', component: Owner },
    { path: '/login', component: Login },
    {path: '/test', component: test},
    {
      path: '/user/:userId',
      component: User,
      props: true,
      children: [
        {
          path: '',
          name: 'userProfile',
          component: UserProfile,
          props: true
        },
        {
          path: 'spots',
          name: 'userSpots',
          component: UserSpots,
          props: true
        },
        {
          path: 'bookings',
          name: 'userBookings',
          component: UserBookings,
          props: true
        }
      ]
    }
  ]
});

export default router;
