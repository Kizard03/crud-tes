<template>
  <div>
    <navbar> </navbar>
    <sidebar></sidebar>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="card col-md-4 mt-5 border-0 shadow-lg">
          <div class="card-body">
            <form @submit.prevent="userLogin">
              <h3 class="mb-4 text-center">Login</h3>
              <div class="mb-3">
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

                <br />
              </div>
              <div class="d-flex mt-3">
                <router-link
                  to="/signup"
                  class="me-auto text-secondary"
                  style="text-decoration: none"
                  >Belum punya akun?</router-link
                >
                <router-link
                  to="/forgot-password"
                  class="text-secondary"
                  style="text-decoration: none"
                  >Forgot Password</router-link
                >
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
        email: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    userLogin() {
      if (!this.user.email || !this.user.password) {
        this.error = "Form tidak boleh kosong.";
      } else {
        this.error = "";
        firebase
          .auth()
          .signInWithEmailAndPassword(this.user.email, this.user.password)
          .then(() => {
            this.setCurrentUserToLocalStorage(
              usersCollection,
              this.user.email
            ).then((result) => {
              if (result.is_admin) {
                window.location.replace("/admin");
                console.log("masuk ke admin");
              } else {
                window.location.replace("/index");
                console.log("masuk ke user");
              }
            });
          })
          .catch((error) => {
            if (
              error.code == "auth/invalid-email" ||
              error.code == "auth/user-not-found"
            ) {
              this.error = "Email belum terdaftar";
            } else if (error.code == "auth/wrong-password") {
              this.error = "Password yang anda masukan salah";
            }
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