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
            name: "products_list",
            meta: {
              title: "Produtos",
              icon: "inventory_2",
            },
            children: [
              {
                path: "",
                name: "products",
                component: () => import("@/views/Products/VProducts.vue"),
                meta: {
                  title: "Produtos",
                  icon: "inventory_2",
                },
              },
              {
                path: "new",
                name: "products_new",
                component: () => import("@/views/Products/VProductsNew.vue"),
                meta: {
                  title: "Novo Produto",
                  icon: "inventory_2",
                },
              },
              {
                path: ":id",
                name: "products_new",
                component: () => import("@/views/Products/VProductsNew.vue"),
                props: true,
                meta: {
                  title: "Editar Produto",
                  icon: "inventory_2",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
