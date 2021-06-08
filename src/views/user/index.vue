<template>
  <div>
    <navbar> </navbar>
    <sidebar></sidebar>
    <div class="container mt-4">
      <div class="card text-center shadow mb-4">
        <div class="card-header">Tugas 1</div>
        <div class="card-body">
          <h5 class="card-title">CRUD</h5>
          <p class="card-text">Membuat CRUD menggunakan Vue JS CLI</p>
          <a href="/anggota" class="btn btn-primary">Selengkapnya ...</a>
        </div>
        <div class="card-footer text-muted">2 days ago</div>
      </div>
      <div class="card text-center shadow mb-4">
        <div class="card-header">Tugas 2</div>
        <div class="card-body">
          <h5 class="card-title">CARD</h5>
          <p class="card-text">
            Membuat CARD dari sebuah data barang menggunakan Vue JS CLI
          </p>
          <a href="/barang" class="btn btn-primary">Selengkapnya ...</a>
        </div>
        <div class="card-footer text-muted">2 days ago</div>
      </div>
      <div class="card text-center shadow mb-4">
        <div class="card-header">Tugas 3</div>
        <div class="card-body">
          <h5 class="card-title">INFINITE SCROLL</h5>
          <p class="card-text">
            Menambahkan infinite scroll dengan limit 6 di dalam sebuah card
          </p>
          <a href="/barang" class="btn btn-primary">Selengkapnya ...</a>
        </div>
        <div class="card-footer text-muted">2 days ago</div>
      </div>
      <div class="card text-center shadow mb-4">
        <div class="card-header">Tugas 4</div>
        <div class="card-body">
          <h5 class="card-title">QUOTES API</h5>
          <p class="card-text">Menambahkan quotes API menggunakan Axios</p>
          <a href="/quotes" class="btn btn-primary">Selengkapnya ...</a>
        </div>
        <div class="card-footer text-muted">2 days ago</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    navbar: () => import("@/components/user/navbar.vue"),
    sidebar: () => import("@/components/user/sidebar.vue"),
  },
};
</script>

