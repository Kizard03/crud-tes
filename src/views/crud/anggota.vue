<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-sm-6">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Umur</th>
                <th>No Tlp</th>
                <th>Opsi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(anggota, index) in anggotas" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ anggota.nama }}</td>
                <td>{{ anggota.alamat }}</td>
                <td>{{ anggota.umur }}</td>
                <td>{{ anggota.tlp }}</td>
                <td>
                  <router-link
                    :to="{ name: 'anggotaedit', params: { id: anggota.key } }"
                    class="btn btn-primary"
                    >Edit </router-link
                  >&nbsp;
                  <button
                    @click.prevent="deleteUser(anggota.key)"
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
      <br />
      <div class="col-md-6 border">
        <h5 class="text mt-3">Tambah Anggota</h5>
        <hr />
        <form @submit.prevent="onFormSubmit">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Nama</label>
            <input type="name" class="form-control" v-model="anggota.nama" />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Alamat</label>
            <input type="name" class="form-control" v-model="anggota.alamat" />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">umur</label>
            <input type="number" class="form-control" v-model="anggota.umur" />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">No Tlp</label>
            <input type="name" class="form-control" v-model="anggota.tlp" />
          </div>
          <button type="submit" class="btn btn-primary">Submit <br /></button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";

export default {
  data() {
    return {
      anggotas: [],
      anggota: {},
    };
  },

  created() {
    db.collection("anggotas").onSnapshot((snapshotChange) => {
      this.anggotas = [];
      snapshotChange.forEach((doc) => {
        this.anggotas.push({
          key: doc.id,
          nama: doc.data().nama,
          alamat: doc.data().alamat,
          tlp: doc.data().tlp,
          umur: doc.data().umur,
        });
      });
    });
  },

  methods: {
    deleteUser(id) {
      if (window.confirm("do you ready to lose???")) {
        db.collection("anggotas")
          .doc(id)
          .delete()
          .then(() => {
            console.log("anggota Deleted");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    onFormSubmit(event) {
      event.preventDefault();
      db.collection("anggotas")
        .add(this.anggota)
        .then(() => {
          alert("anggota successfully created!");
          this.anggota.nama = "";
          this.anggota.alamat = "";
          this.anggota.umur = "";
          this.anggota.tlp = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>