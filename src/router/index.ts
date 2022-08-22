import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "default",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "/",
        name: "management",
        meta: {
          title: "Gerencimento",
          icon: "manage_search",
        },
        children: [
          {
            path: "/products",
            name: "products",
            component: () => import("@/views/VProducts.vue"),
            meta: {
              title: "Produtos",
              icon: "inventory_2",
            },
          },
        ]
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
