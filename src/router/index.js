import { createRouter, createWebHistory } from 'vue-router'
import Category from "@/views/master-data/Category";
import Brand from "@/views/master-data/Brand";
import Appointment from "@/views/appointment/Appointment";
import AppointmentDetail from "@/views/appointment/AppointmentDetail";
import Dress from "@/views/Dress/Dress";
import Package from "@/views/package/Package";
import PackageDetail from "@/views/package/PackageDetail";
import Collection from "@/views/appointment/Collection";
import Login from "@/views/auth/Login";
import EditDress from "@/views/Dress/EditDress";
import Theme from "@/views/scene/Theme";
import EditTheme from "@/views/scene/EditTheme";

const routes = [
  {
    path: '/',
    name: '/',
    component: Category
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/brand',
    name: 'brand',
    component: Brand
  },
  {
    path: '/appointment',
    name: 'appointment',
    component: Appointment
  },
  {
    path: '/appointment/detail',
    name: 'appointment/detail',
    component: AppointmentDetail
  },
  {
    path: '/dress',
    name: 'dress',
    component: Dress
  },
  {
    path: '/editDress',
    name: 'editDress',
    component: EditDress
  },
  {
    path: '/collection',
    name: 'collection',
    component: Collection
  },
  {
    path: '/theme',
    name: 'theme',
    component: Theme
  },
  {
    path: '/editTheme/:id',
    name: 'editTheme',
    component: EditTheme
  },
  {
    path: '/package',
    name: 'package',
    component: Package
  },
  {
    path: '/package/detail',
    name: 'package/detail',
    component: PackageDetail
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
