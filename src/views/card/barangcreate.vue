<template>
  <div class="container" style="padding: 10px">
    <div class="card">
      <div class="card-body">
        <h5>Tambah Barang</h5>
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
            <option selected value="" disabled>-- Pilih Barang --</option>
            <option value="sepatu">sepatu</option>
            <option value="baju">baju</option>
            <option value="aksesoris">aksesoris</option>
            <option value="elektronik">elektronik</option>
            <option value="jamtangan">Jam Tangan</option>
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
          <label>Gambar Berita</label>
          <input
            type="file"
            class="form-control"
            accept="image/*"
            @change="image"
          />
        </div>
        <br />

        <div class="form-group">
          <button class="btn btn-sm btn-success float-right" @click="save">
            Simpan</button
          >&nbsp;

          <router-link
            class="btn btn-sm btn-primary float-right mr-2"
            to="/home"
            >Kembali</router-link
          >
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
      br: firebase.firestore().collection("barangs"),
      barang: {
        namabarang: "",
        deskripsi: "",
        kategori: "",
        tgl: new Date().toISOString().substr(0, 10),
        img: "",
      },
      imageData: null,
    };
  },

  methods: {
    image(event) {
      this.imageData = event.target.files[0];
      console.log(this.imageData);
    },

    save() {
      console.log(this.barang);

      var storageRef = firebase
        .storage()
        .ref("barang/" + "BER_" + Math.floor(10000 + Math.random() * 9000));
      storageRef.put(this.imageData).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(this.barang);
          this.barang.img = downloadURL;
          this.br.add(this.barang).then(() => {
            console.log(downloadURL);
            window.setTimeout(() => {
              router.push({
                name: "barang",
              });
            }, 1500);
          });
        });
      });
    },
  },
};
</script>