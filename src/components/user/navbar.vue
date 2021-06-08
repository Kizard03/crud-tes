<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background: #00cec9">
    <div class="container-fluid">
      <a class="navbar-brand" href="/index">Navbar</a>

      <div>
        <i class="fa fa-bars" aria-hidden="true"></i>
        <b-icon
          icon="list"
          font-scale="2"
          class="text-white"
          v-b-toggle.sidebar-no-header
        ></b-icon>
      </div>
    </div>
  </nav>
</template>
<script>
import menu from "@/menus";
export default {
  data() {
    return {
      menus: menu.user,
    };
  },
};
</script>