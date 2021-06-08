<template>
  <div>
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="container mt-4">
      <div class="card text-center shadow mb-4">
        <div class="card-header">Crud</div>
        <div class="card-body">
          <h5 class="card-title">Data Barang</h5>
          <p class="card-text">
            Untuk mengisi data dari barang yg ingin ditambahkan
          </p>
          <a href="/databarang" class="btn btn-primary">Selengkapnya ...</a>
        </div>
        <div class="card-footer text-muted">2 days ago</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    navbar: () => import("@/components/admin/navbar.vue"),
    sidebar: () => import("@/components/admin/sidebar.vue"),
  },
};
</script>