<template>
  <div class="container mt-4">
    <div class="card" v-for="barang in barangs" :key="barang.key">
      <img v-bind:src="barang.img" class="card-img-top" alt="" />
      <div class="card-body">
        <h5 class="card-title">{{ barang.namabarang }}</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>

<script>
// import { db } from "@/firebase";
import firebase from "firebase";
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

  mounted() {
    const ref = firebase
      .firestore()
      .collection("barangs")
      .doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.barang = doc.data();
        console.log(this.data());
      } else {
        alert("Berita tidak ditemukan!");
      }
    });
  },
};
</script>