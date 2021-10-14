import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../layouts/BasicLayout"),
      children: [
        {
          path: "",
          name: "",
          component: () => import("../views/billboard"),
        },
      ],
    },
  ],
});
