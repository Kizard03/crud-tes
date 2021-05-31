<template>
  <div id="app">
    <Nav />
    <Sidebar />
    <router-view></router-view>
  </div>
</template>
<script>
import Nav from "@/components/navbar.vue";
import Sidebar from "@/components/sidebar.vue";

export default {
  components: {
    Nav,
    Sidebar,
  },
};
</script>

