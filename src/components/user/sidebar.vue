<template>
  <div>
    <b-sidebar
      id="sidebar-no-header"
      right
      no-header
      shadow
      style="background: #ff7675"
    >
      <template #default="{ hide }">
        <div class="p-3 text-center">
          <br />
          <h5>User Sidebar</h5>
          <hr />
          <br />
          <ul class="navbar-nav">
            <li class="nav-item">
              <!-- <router-link :to="{ name: 'home' }" style="width: 150px"
                >Home</router-link
              > -->
              <router-link
                to="/index"
                style="text-decoration: none; color: white"
                ><button style="width: 260px" class="btn btn-primary">
                  Home
                </button></router-link
              >
              <br />
            </li>
            <br />
            <li class="nav-item">
              <router-link
                to="/anggota"
                style="text-decoration: none; color: white"
                ><button style="width: 260px" class="btn btn-primary">
                  Crud
                </button></router-link
              ><br />
            </li>
            <br />
            <li class="nav-item">
              <router-link
                to="/barang"
                style="text-decoration: none; color: white"
                ><button style="width: 260px" class="btn btn-primary">
                  Card
                </button></router-link
              ><br />
            </li>
            <br />

            <li class="nav-item">
              <router-link
                to="/quotes"
                style="text-decoration: none; color: white"
              >
                <button style="width: 260px" class="btn btn-primary">
                  Quotes API
                </button>
              </router-link>
            </li>
            <div class="fixed-bottom mb-6">
              <button
                class="btn btn-primary bg-dark"
                style="width: 300px"
                block
                @click="hide"
              >
                close sidebar
              </button>
              <button
                class="btn btn-danger mt-3"
                style="width: 300px"
                @click="userLogout"
              >
                Logout
              </button>
            </div>
          </ul>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      //
    };
  },
  methods: {
    userLogout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.removeCurrentUser();
          firebase.auth().onAuthStateChanged(() => {
            window.location.replace("/");
          });
        });
    },
  },
};
</script>