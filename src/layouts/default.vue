<template>
  <q-layout view="hHh Lpr lFr">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title> Web Stock </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item-label header>Menu</q-item-label>

        <q-expansion-item
          v-for="route in routes"
          :key="route.name"
          :label="route.meta.title"
        >
          <q-item
            v-for="item in route.children"
            clickable
            v-ripple
            :to="item.path"
            active-class="text-primary"
            :key="item.name"
          >
            <q-item-section avatar>
              <q-icon :name="item.meta.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.meta.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LayoutDefault",

  setup() {
    const router = useRouter();
    const routes = router.options.routes[0].children;

    return {
      leftDrawerOpen: ref(false),
      routes,
    };
  },
});
</script>
