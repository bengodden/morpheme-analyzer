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
      indexName: 'words',
      queryKey: 'roman'
    };
  },
  methods: {
    queryMorpheme() {
      //reset results array
      this.results = [];

      stretchy
        .searchTerm(this.indexName, this.queryKey, this.query)
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

<style scoped>
input {
  border: 2px solid black;
}

button {
  background: #0f3aaf;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  letter-spacing: 1px;
  cursor: pointer;
  margin: 10px;
}
button[disabled] {
  opacity: 0.2;
  cursor: not-allowed;
}

input {
  padding: 10px 15px;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}

label {
  color: black;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
</style>
