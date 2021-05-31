<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-3 col-6" v-for="barang in barangs" :key="barang.key">
        <div class="card mb-3">
          <img
            class="card-img-top"
            v-bind:src="barang.img"
            style="height: 40vh; background-size: cover"
          />
          <div class="card-body">
            <h4 class="card-title">{{ barang.namabarang }}</h4>
            <p class="card-text">{{ barang.deskripsi }}</p>
            <hr />
            <p
              class="card-text"
              style="font-size: 12px; color: gray; font-weight: bold"
            >
              {{ barang.tgl }}
            </p>
          </div>
          <router-link
            to="/barang/databarang"
            class="btn btn-primary btn-block btn-sm"
            >selengkapnya....</router-link
          >
        </div>
      </div>
      <InfiniteLoading @infinite="infiniteHandler"></InfiniteLoading>
      <br />
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "barangs",
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      barangs: [],
      lastDocSnapshot: null,
    };
  },
  methods: {
    async fetchPictures() {
      const db = firebase.firestore();
      let picturesRef = db.collection("barangs").limit(12);

      if (this.lastDocSnapshot) {
        picturesRef = picturesRef.startAfter(this.lastDocSnapshot);
      }

      const picturesSnap = await picturesRef.get();
      this.lastDocSnapshot = picturesSnap.docs[picturesSnap.docs.length - 1];
      const result = picturesSnap.docs.map((p) => p.data());

      this.barangs.push(...result);

      return result.length;
    },
    async infiniteHandler($state) {
      const newPicturesCount = await this.fetchPictures();

      if (newPicturesCount > 0) {
        return $state.loaded(); // More pictures to come
      }

      return $state.complete(); // Done with the pictures
    },
  },
};
</script>

