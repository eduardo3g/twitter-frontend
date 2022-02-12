import Vue from "vue";
import VueRouter from "vue-router";
import Root from "../views/Root.vue";
import AuthMiddleware from "./auth.guard";

// avoid NavigationDuplicated
// https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      // resolve err
      return err;
    }
    // rethrow error
    return Promise.reject(err);
  });
};

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
    path: "/search",
    name: "Search",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Search.vue"),
    meta: { protected: true },
  },
  {
    path: "/hashtag",
    name: "Hashtag",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "hashtag" */ "../views/Hashtag.vue"),
    meta: { protected: true },
  },
  {
    path: "/notifications",
    name: "Notifications",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "notifications" */ "../views/Notifications.vue"
      ),
    meta: { protected: true },
  },
  {
    path: "/messages",
    name: "Messages",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "messages" */ "../views/Messages.vue"),
    props: true,
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
