<template>
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
                    @click.prevent="deletebarang(barang.key)"
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
</template>

<script>
import firebase from "firebase";
// import router from "../../../router";

export default {
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
    const ref = firebase.firestore().collection("barangs");
    ref.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data());
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
    deletebarang(id) {
      if (window.confirm("do you ready to lose???")) {
        firebase
          .firestore()
          .collection("barangs")
          .doc(id)
          .delete()
          .then(() => {
            console.log("barang Deleted");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>