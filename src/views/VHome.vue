<template>
  <div><h1>Home</h1></div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "VHome",

  setup() {
    const store = useStore();
    store.dispatch('GET_CATEGORIES')
  }
 });
</script>

<style></style>

