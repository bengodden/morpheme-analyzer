<template>
  <div>
    <div>
      <label>Input Morpheme</label>
      <input type="text" v-model="query"/>
    </div>
    <div class="submit">
      <button @click="queryMorpheme">Search</button>
    </div>
    <div class="noResults" v-if="noResults">
      <p>There are no entries for that query.</p>
    </div>
    <div v-for="result in results" :key="result._id">
      <input
        type="checkbox"
        :id="result._id"
        :value="result._id"
        v-model="checkedBoxes"
      />
      <label :for="result._id"
        >{{ result._source.roman }} - {{ result._source.definition }}</label
      >
      
    </div>
    {{ checkedBoxes }}
  </div>
</template>

<script>
import stretchy from "../services/stretchy";

// const Lookup = require("../services/Lookup").default

export default {
  name: "SearchLexicon",
  props: [],
  data() {
    return {
      query: "mîna",
      results: [],
      noResults: false,
      checkedBoxes: [],
    };
  },
  methods: {
    queryMorpheme() {
      //reset results array
      this.results = [];

      stretchy
        .searchTerm(this.query)
        .then((response) => {
          response.forEach((element) => {
            this.results.push(element);
          });
          if (this.results.length == 0) {
            this.noResults = true;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style></style>
