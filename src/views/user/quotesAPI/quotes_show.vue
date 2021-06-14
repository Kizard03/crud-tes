<template>
  <!-- <div class="container mt-4">
      <div class="card mb-3">
        <img src="" class="card-img-top" alt="" />
        <div class="card-body">
          <h5 class="card-title"></h5>
          <p class="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content /is a little bit longer.
          </p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </div> -->
  <div class="pb-5 bg-info">
    <navbar class="shadow"> </navbar>
    <sidebar></sidebar>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div
          class="card shadow border-0 bg-secondary text-white p-3"
          style="width: 500px"
        >
          <div v-for="(quote, index) in quotes" :key="index" class="card-body">
            <b-icon icon="chat-square-quote-fill" font-scale="2"></b-icon>
            <h4>"{{ quotes[index].quote }}"</h4>
            <br />
            <p class="text-end mt-2">- {{ quotes[index].author }}, 2021</p>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  // async mounted() {
  //   let param = this.$route.params.quote;

  //   const response = await axios.get(
  //     `https://quotes.rest/qod?category=${param}language=en`
  //   );
  //   this.quotes = response.data.contents.quotes;
  //   console.log(this.quotes);
  // },

  async mounted() {
    let parameter = this.$route.params.quote;
    //   const response = await axios.get(
    //     `https://quotes.rest/qod?category=${parameter}&language=en`
    //   );

    //   this.quotes = response.data.contents.categories;
    //   this.quotes1 = response.data.copyright;
    //   this.quotesurl = response.data;

    //   console.log(this.quotesurl);
    // },
    axios
      .get(`https://quotes.rest/qod?category=${parameter}&language=en`)
      .then((res) => {
        this.quotes = res.data.contents.quotes;
        this.quoteimg = res.data;
        console.log(this.quoteimg);
      });
  },
};
</script>

