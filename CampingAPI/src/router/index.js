import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Booking from '../views/Booking.vue';
import Login from '../views/Login.vue';
import User from '../views/User.vue';
import UserProfile from '../components/UserProfile.vue';
import UserSpots from '../components/UserSpots.vue'; // Create this component
import UserBookings from '../components/UserBookings.vue'; // Create this component


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    { path: '/booking', component: Booking },
    { path: '/login', component: Login },
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
