<template>
  <div>
    <div class="box">
      <label>Search</label>
      <input type="text" v-model="query" placeholder="kīkwāy ē-natonaman?" />
      <div v-for="type in searchTypes" :key="type">
        <input
          class="search-type"
          type="radio"
          :id="type"
          :value="type"
          v-model="searchType"
        />
        <label :for="type">{{ type }}</label>
      </div>

      <div class="submit">
        <button @click="queryMorpheme">Search</button>
      </div>
    </div>
    <span>IndexName: {{ indexName }}</span
    ><br />
    <span>Items Selected: {{ checkedBoxes }}</span>

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
      query: "",
      results: [],
      noResults: false,
      checkedBoxes: [],
      indexName: "words",
      queryKey: "roman",
      searchTypes: ["SRO", "English", "Morphemes"],
      searchType: "SRO",
    };
  },
  methods: {
    queryMorpheme() {
      //reset results array
      this.results = [];
      stretchy
        .searchTerm(
          this.indexName,
          this.searchType == "SRO" ? "roman" : "definition",
          this.query
        )
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
  display: flex;
  float: left;
}
input {
  padding: 10px 15px;
  box-sizing: border-box;
  border: 1px solid #555;
  border-bottom: 1px solid #ddd;
  color: #555;
  display: flex;
}
/* label {
  color: black;
  display: inline-block;
  margin: 25px 5px 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
} */
label {
  float: left;
  clear: none;
  display: flex;
  padding: 15px 1em 0px 8px;
}
input.search-type {
  display: flex;
  vertical-align: middle;
  float: left;
  /* clear: none; */
  margin: 2px 0 0 2px;
}
input[type="radio"],
input.radio {
  float: left;
  clear: none;
  margin: 15px 0 0 2px;
  vertical-align: middle;
}
.box {
  display: flex;
}
</style>
