<template>
  <div>
    <navbar> </navbar>
    <sidebar></sidebar>
    <div class="container mt-4">
      <center>
        <h4>Categories Quotes API</h4>
      </center>
      <div class="row">
        <div
          class="col-sm-4 col-6 mt-3"
          v-for="(quote, index) in quotes"
          :key="quote.id"
        >
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">{{ quotes[index].name }}</h5>
              <p class="card-text">
                {{ quotes[index].description }}
              </p>
              <a :href="'/quotes/' + quotes[index].name" class="btn btn-primary"
                >Go somewhere</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="container mt-4">
    <div class="row">
      <div class="col-md-6" v-for="(quote, index) in quotes" :key="quote.index">
        <a :href="'/quotes/' + quotes[index].name">
          <div class="d-flex position-relative">
            <img
              v-bind:src="quotesimg.baseurl + quotes[index].background"
              class="flex-shrink-0 me-3"
              width="250px"
            />
            <div class="card-text">
              <h5 class="mt-0">{{ quotes[index].name }}</h5>
              <p>{{ quotes[index].description }}</p>
            </div>
          </div>
        </a>
        <br />
      </div>
    </div>
  </div> -->
</template>
<script>
import axios from "axios";
export default {
  components: {
    navbar: () => import("@/components/user/navbar.vue"),
    sidebar: () => import("@/components/user/sidebar.vue"),
  },
  data() {
    return {
      quotes: [],
    };
  },

  // mounted() {
  //   axios
  //     .get("https://quotes.rest/qod/categories?language=en&detailed=true")
  //     .then((response) => (this.quotes = response));

  //   console.log(this.quotes.contents.categories);
  // },
  async mounted() {
    const response = await axios.get(
      "https://quotes.rest/qod/categories?language=en&detailed=true"
    );

    this.quotes = response.data.contents.categories;
    this.quotes1 = response.data.copyright;
    this.quotesurl = response.data;

    console.log(this.quotesurl);
  },
};
// import axios from "axios";

// export default {
//   data() {
//     return {
//       quotes: [],
//     };
//   },

//   async mounted() {
//     const response = await axios.get(
//       "https://quotes.rest/qod/categories?language=en&detailed=true"
//     );
//     this.quotes = response.data.contents.categories;
//     this.quotesimg = response.data;
//     this.quotes1 = response.data;
//     console.log(this.quotes1);
//   },
// };
</script>
