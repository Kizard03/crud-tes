<template>
  <div>
    <navbar></navbar>
    <sidebar></sidebar>

    <div class="container" style="padding: 10px">
      <div class="card">
        <div class="card-body">
          <h5>Tambah Barang</h5>
          <hr />
          <div class="form-group">
            <label>Nama Barang</label>
            <input
              type="text"
              class="form-control"
              v-model="barang.namabarang"
            />
          </div>

          <div class="form-group">
            <label>Deskripsi Barang</label>
            <input
              type="text"
              class="form-control"
              v-model="barang.deskripsi"
              required
            />
          </div>

          <div class="form-group">
            <label>Kategori</label>
            <select
              v-model="barang.kategori"
              class="form-select"
              placeholder="Pilih Barang Yang Diinginkan"
            >
              <option selected value="" disabled>-- pilih barang --</option>
              <option value="sepatu">sepatu</option>
              <option value="baju">baju</option>
              <option value="aksesoris">aksesoris</option>
              <option value="elektronik">elektronik</option>
              <option value="jam tangan">Jam Tangan</option>
            </select>
          </div>

          <div class="form-group">
            <label>Tanggal</label>
            <input
              type="date"
              class="form-control"
              v-model="barang.tgl"
              readonly
            />
          </div>

          <div class="form-group">
            <label>Gambar Barang</label>
            <input
              type="file"
              class="form-control"
              accept="image/*"
              @change="image"
            />
          </div>
          <div class="form-group mt-3">
            <img v-if="preview" :src="preview" alt="" width="350" />
          </div>
          <br />

          <div class="form-group">
            <button class="btn btn-sm btn-success float-right" @click="save">
              Simpan</button
            >&nbsp;

            <router-link
              class="btn btn-sm btn-primary float-right mr-2"
              to="/databarang"
              >Kembali</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import router from "@/router";
// import Navbar from "../../components/navbar.vue";
// import Sidebar from "../../components/sidebar.vue";
export default {
  components: {
    navbar: () => import("@/components/admin/navbar.vue"),
    sidebar: () => import("@/components/admin/sidebar.vue"),
  },
  data() {
    return {
      br: firebase.firestore().collection("barangs"),
      barang: {
        namabarang: "",
        deskripsi: "",
        kategori: "",
        tgl: new Date().toISOString().substr(0, 10),
        img: "",
      },
      imageData: null,
      preview: null,
    };
  },

  methods: {
    image(event) {
      this.imageData = event.target.files[0];
      this.preview = URL.createObjectURL(this.imageData);
      console.log(this.imageData);
    },

    save() {
      console.log(this.barang);

      var storageRef = firebase
        .storage()
        .ref("barang/" + "BER_" + Math.floor(10000 + Math.random() * 90000));
      storageRef.put(this.imageData).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(this.barang);
          this.barang.img = downloadURL;
          this.br.add(this.barang).then(() => {
            console.log(downloadURL);
            this.$swal({
              icon: "success",
              title: "Sukses",
              text: "Barang berhasil ditambahkan!",
              showConfirmButton: false,
              timer: 1500,
            });
            window.setTimeout(() => {
              router.push({
                name: "databarang",
              });
            }, 1500);
          });
        });
      });
    },
    // tes() {
    //   console.log(this.barang);
    //   if (this.barangs) {
    //     alert("required");
    //     var storageRef = firebase
    //       .storage()
    //       .ref("barang/" + "BER_" + Math.floor(10000 + Math.random() * 9000));
    //     storageRef.put(this.imageData).then((snapshot) => {
    //       snapshot.ref.getDownloadURL().then((downloadURL) => {
    //         console.log(this.barang);
    //         this.$swal({
    //           icon: "success",
    //           title: "Sukses",
    //           text: "barang berhasil ditambahkan!",
    //           showConfirmButton: false,
    //           timer: 1500,
    //         });
    //         this.barang.img = downloadURL;
    //         this.br.add(this.barang).then(() => {
    //           console.log(downloadURL);
    //           window.setTimeout(() => {
    //             router.push({
    //               name: "databarang",
    //             });
    //           }, 1500);
    //         });
    //       });
    //     });
    //   }
    // },
  },
};
</script>