<template>
  <div>
    <navbar> </navbar>
    <sidebar></sidebar>
    <div class="row justify-content-center">
      <div class="col-md-5">
        <h3 class="text-center">Update User</h3>
        <form @submit.prevent="onUpdateForm">
          <div class="form-group">
            <label>Name</label>
            <input
              type="text"
              class="form-control"
              v-model="anggota.nama"
              required
            />
          </div>

          <div class="form-group">
            <label>Alamat</label>
            <input
              type="text"
              class="form-control"
              v-model="anggota.alamat"
              required
            />
          </div>

          <div class="form-group">
            <label>Umur</label>
            <input
              type="number"
              class="form-control"
              v-model="anggota.umur"
              required
            />
          </div>
          <div class="form-group">
            <label>No Tlp</label>
            <input
              type="text"
              class="form-control"
              v-model="anggota.tlp"
              required
            />
          </div>
          <br />

          <div class="form-group">
            <button type="submit" class="btn btn-primary justify-content">
              Save Changes
            </button>
          </div>
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
      anggota: {},
    };
  },
  created() {
    let dbRef = db.collection("anggotas").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.anggota = doc.data();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onUpdateForm(event) {
      event.preventDefault();
      db.collection("anggotas")
        .doc(this.$route.params.id)
        .update(this.anggota)
        .then(() => {
          console.log("User successfully updated!");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    navbar: () => import("@/components/user/navbar.vue"),
    sidebar: () => import("@/components/user/sidebar.vue"),
  },
};
</script>