<template>
  <div class="container mt-4" style="padding: 10px">
    <div class="card">
      <div class="card-body">
        <h5>Update Barang</h5>
        <hr />

        <div class="form-group">
          <label>Nama Barang</label>
          <input type="text" class="form-control" v-model="barang.namabarang" />
        </div>

        <div class="form-group">
          <label>Deskripsi Barang</label>
          <input type="text" class="form-control" v-model="barang.deskripsi" />
        </div>

        <div class="form-group">
          <label>Kategori</label>
          <select
            v-model="barang.kategori"
            class="form-select"
            placeholder="Pilih Barang Yang Diinginkan"
          >
            <option selected value="" disabled></option>
            <option value="sepatu">sepatu</option>
            <option value="baju">baju</option>
            <option value="aksesoris">aksesoris</option>
            <option value="elektronik">elektronik</option>
            <option value="jamtangan">Jam Tangan</option>
          </select>
        </div>
        <br />

        <div class="row">
          <div class="col-sm-3">
            <div class="text-center">Foto Barang saat ini</div>
            <center class="mt-2">
              <img
                v-bind:src="barang.img"
                width="150px"
                height="100px"
                alt=""
              />
            </center>
          </div>
          <div class="col-sm-9">
            <div class="form-group">
              <label>Foto Barang</label>
              <input
                type="file"
                class="form-control"
                accept="image/*"
                @change="image"
              />
              <div class="form-group mt-2">
                <button
                  class="btn btn-sm btn-success float-right"
                  @click="save"
                >
                  Simpan</button
                >&nbsp;
                <router-link
                  to="/home"
                  class="btn btn-primary float-right btn-sm mr-2"
                  >Kembali</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import router from "../../router";

export default {
  data() {
    return {
      key: this.$route.params.id,
      barang: {
        namabarang: "",
        kategori: "",
        deskripsi: "",
        tgl: "",
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
      } else {
        alert("Berita tidak ditemukan!");
      }
    });
  },
  methods: {
    image(event) {
      this.imageData = event.target.files[0];
      console.log(this.imageData);
      // this.save();
    },
    save() {
      const updateRef = firebase
        .firestore()
        .collection("barangs")
        .doc(this.$route.params.id);

      console.log(this.barang);
      if (this.imageData != null) {
        let image_old = firebase.storage().refFromURL(this.barang.img);
        console.log(image_old);
        image_old.delete().then(() => {
          console.log("Image terhapus!");
        });

        var storageRef = firebase
          .storage()
          .ref("barang/" + "BER_" + Math.floor(10000 + Math.random() * 90000));
        storageRef.put(this.imageData).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(this.barang);

            this.barang.img = downloadURL;
            updateRef
              .set(this.barang)
              .then(() => {
                this.key = "";
                this.barang.namabarang;
                this.barang.deskripsi;
                this.barang.kategori;
                this.$swal({
                  icon: "success",
                  title: "Berita berhasil ditambahkan!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setTimeout(() => {
                  router.push({
                    name: "databarang",
                  });
                }, 1500);
              })
              .catch((error) => {
                alert("Error saat edit data, error: ", error);
              });
          });
        });
      } else {
        console.log(this.barang);

        updateRef
          .set(this.barang)
          .then(() => {
            this.key = "";
            this.barang.namabarang;
            this.barang.deskripsi;
            this.barang.kategori;
            this.$swal({
              icon: "success",
              title: "Sukses",
              text: "Berita berhasil disimpan!",
              showConfirmButton: false,
              timer: 1500,
            });
            window.setTimeout(() => {
              router.push({
                name: "databarang",
              });
            }, 1500);
          })
          .catch((error) => {
            this.$swal({
              icon: "error",
              title: "Error",
              text: "Berita gagal disimpan! error: " + error.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    },
  },
};
</script>
