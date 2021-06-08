<template>
  <div>
    <navbar> </navbar>
    <sidebar></sidebar>
    <div class="container">
      <div class="row justify-content-center">
        <div class="card col-md-4 mt-5 border-0 shadow-lg">
          <div class="card-body">
            <form @submit.prevent="userRegister">
              <h3 class="mb-4 text-center">Register</h3>
              <div class="mb-3">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Username</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="user.name"
                  />
                </div>
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  v-model="user.email"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  v-model="user.password"
                />
              </div>
              <div class="row">
                <button type="submit" class="btn btn-primary mt-3">
                  Masuk
                </button>
                <router-link
                  to="/login"
                  class="mt-3 text-secondary"
                  style="text-decoration: none"
                  >Sudah punya akun?</router-link
                ><br />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { usersCollection } from "@/firebase";
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        created_at: Date.now(),
      },
      error: "",
      loading: false,
    };
  },
  methods: {
    async userRegister() {
      this.loading = true;
      if (!this.user.name || !this.user.email || !this.user.password) {
        this.error = "Form tidak boleh ada yang kosong";
        this.loading = false;
      } else {
        this.error = "";
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then(() => {
            this.error = "";
          })
          .catch((error) => {
            if (error.code == "auth/email-already-in-use") {
              this.error = "Email sudah terdaftar.";
            } else if (error.code == "auth/invalid-email") {
              this.error = "Format email tidak benar.";
            }
          });
        usersCollection
          .doc(this.user.email)
          .set(this.user)
          .then(() => {
            this.setCurrentUserToLocalStorage(
              usersCollection,
              this.user.email
            ).then(() => {
              window.location.replace("/index");
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },

  components: {
    navbar: () => import("@/components/navbar.vue"),
    sidebar: () => import("@/components/sidebar.vue"),
  },
};
</script>