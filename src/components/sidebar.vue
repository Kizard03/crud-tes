
<template>
  <div>
    <b-sidebar
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
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
              <button style="width: 260px" class="btn btn-primary">
                <a href="/" style="text-decoration: none; color: white">Home</a>
              </button>
              <br />
            </li>
            <br />
            <li class="nav-item">
              <button style="width: 260px" class="btn btn-primary">
                <a href="/anggota" style="text-decoration: none; color: white"
                  >Crud</a
                ></button
              ><br />
            </li>
            <br />
            <li class="nav-item">
              <button style="width: 260px" class="btn btn-primary">
                <a href="/barang" style="text-decoration: none; color: white"
                  >Card</a
                ></button
              ><br />
            </li>
            <br />
            <li class="nav-item">
              <button style="width: 260px" class="btn btn-primary">
                <a
                  href="/barang/databarang"
                  style="text-decoration: none; color: white"
                  >Data Barang</a
                >
              </button>
            </li>
            <br />

            <li class="nav-item">
              <button style="width: 260px" class="btn btn-primary">
                <a href="/quotes" style="text-decoration: none; color: white"
                  >Quotes API</a
                >
              </button>
            </li>
            <div class="fixed-bottom mb-6">
              <button
                class="btn btn-primary"
                style="width: 300px"
                block
                @click="hide"
              >
                close sidebar
              </button>
            </div>
          </ul>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>