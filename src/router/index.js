import Vue from "vue";
import VueRouter from "vue-router";
import Root from "../views/Root.vue";
import AuthMiddleware from "./auth.guard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Root",
    component: Root,
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LogIn.vue"),
  },
  {
    path: "/home",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: { protected: true },
  },
  {
    path: "/:screenName",
    name: "Profile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    meta: { protected: true },
  },
  {
    path: "/:screenName/followers",
    name: "Followers",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "followers" */ "../views/Followers.vue"),
    props: true,
    meta: { protected: true },
  },
  {
    path: "/:screenName/following",
    name: "Following",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "following" */ "../views/Following.vue"),
    props: true,
    meta: { protected: true },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(AuthMiddleware);

export default router;
