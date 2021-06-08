<template>
  <div>
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-sm-12">
          <div class="table-responsive">
            <router-link
              class="btn btn-sm btn-success float-right"
              :to="{ name: 'barangcreate' }"
              >Tambah +</router-link
            >
            <table class="table table-responsive">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama Barang</th>
                  <th>Jenis Barang</th>
                  <th>Deskripsi</th>
                  <th>Foto</th>
                  <th>Opsi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(barang, index) in barangs" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ barang.namabarang }}</td>
                  <td>{{ barang.kategori }}</td>
                  <td>{{ barang.deskripsi }}</td>
                  <td>
                    <img
                      class="card-img-top"
                      v-bind:src="barang.img"
                      style="height: 80px; width: 90px; background-size: cover"
                    />
                  </td>
                  <td>
                    <router-link
                      :to="{ name: 'barangupdate', params: { id: barang.key } }"
                      class="btn btn-primary"
                      >Edit </router-link
                    >&nbsp;
                    <button
                      @click.prevent="deleteBarang(barang.key)"
                      class="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
// import router from "../../../router";

export default {
  components: {
    navbar: () => import("@/components/admin/navbar.vue"),
    sidebar: () => import("@/components/admin/sidebar.vue"),
  },
  data() {
    return {
      key: this.$route.params.id,
      barangs: [],
      barang: {
        namabarang: "",
        deskripsi: "",
        kategori: "",
        img: "",
      },
      imageData: null,
    };
  },

  created() {
    db.collection("barangs").onSnapshot((snapshotChange) => {
      this.barangs = [];
      snapshotChange.forEach((doc) => {
        this.barangs.push({
          key: doc.id,
          namabarang: doc.data().namabarang,
          deskripsi: doc.data().deskripsi,
          kategori: doc.data().kategori,
          img: doc.data().img,
        });
      });
    });
  },

  methods: {
    deleteBarang(id) {
      if (window.confirm("do you ready to lose???")) {
        db.collection("barangs")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Barang Deleted");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>