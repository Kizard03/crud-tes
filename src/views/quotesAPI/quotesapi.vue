<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6" v-for="(quote, index) in quotes" :key="quote.index">
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
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      quotes: [],
    };
  },

  async mounted() {
    const response = await axios.get(
      "https://quotes.rest/qod/categories?language=en&detailed=true"
    );
    this.quotes = response.data.contents.categories;
    this.quotesimg = response.data;
    console.log(this.quotes);
  },
};
</script>
