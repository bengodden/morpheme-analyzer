<template>
  <div>
    <div class="container">
      <div class="search">
        <div id="searchTypeContainer">
          <div v-for="type in searchTypes" :key="type.orth" id="typeOfSearch">
            <input
              class="search-type"
              type="radio"
              :id="type"
              :value="type"
              v-model="searchType"
            />
            <label :for="type">{{ type.orth }}</label>
          </div>
        </div>
        <input type="text" v-model="query" placeholder="kīkwāy ē-natonaman?" />

        <div class="submit">
          <button @click="queryMorpheme">Search</button>
        </div>
      </div>
      <!-- <span>IndexName: {{ currentIndex }}</span
      ><br />
      <span>Items Selected: {{ checkedBoxes }}</span> -->

      <div class="indexMorpheme">
        <IndexMorpheme />
      </div>

      <div class="noResults" v-if="noResults">
        <p>There are no entries for that query.</p>
      </div>

      <div v-for="result in results" :key="result._id" class="listContainer">
        <input
          type="checkbox"
          :id="result.id"
          :value="result.id"
          v-model="checkedBoxes"
          class="listItem"
        />
        <span class="listItem2">{{ result.lemma }}</span>
        <span class="listItem3">{{ result.definition }}</span>
        <span class="listItem4"><MorphemeBreakdown result="result" /></span>
      </div>
    </div>

    <div class="createmorpheme">
      <MorphemeBreakdown />
    </div>
  </div>
</template>

<script>
import stretchy from "../services/stretchy";
import MorphemeBreakdown from "../components/MorphemeBreakdown.vue";
import IndexMorpheme from "../components/IndexMorpheme.vue";
// const Lookup = require("../services/Lookup").default
export default {
  name: "SearchLexicon",
  components: { MorphemeBreakdown, IndexMorpheme },
  props: [],
  data() {
    return {
      query: "",
      results: [],
      noResults: false,
      checkedBoxes: [],
      searchTypes: [
        { orth: "SRO", queryKey: "roman" },
        { orth: "English", queryKey: "definition" },
        { orth: "Morphemes", queryKey: "morpheme" },
      ],
      searchType: { orth: "SRO", queryKey: "roman" },
    };
  },
  methods: {
    queryMorpheme() {
      this.results = [];
      this.clearCheckedBoxes();
      console.log(
        "submitting:" + this.currentIndex,
        this.searchType.queryKey,
        this.query
      );
      stretchy
        .searchTerm(this.currentIndex, this.searchType.queryKey, this.query)
        .then((response) => {
          console.log("passed back elements: ", response);
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
    clearCheckedBoxes() {
      if (typeof this.checkedBoxes !== "undefined") {
        this.checkedBoxes.splice(0, this.checkedBoxes.length);
      }
    },
  },
  computed: {
    currentIndex() {
      if (
        this.searchType.orth === "SRO" ||
        this.searchType.orth === "English"
      ) {
        return this.$store.state.wordIndex;
      } else {
        return this.$store.state.morphemeIndex;
      }
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
}
input {
  padding: 10px 15px;
  border: 1px solid #555;
  border-bottom: 1px solid #ddd;
  color: #555;
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
  padding: 15px 1em 0px 8px;
}
input.search-type {
  margin: 2px 0 0 2px;
  flex-grow: 1;
}
input.radio {
  margin: 15px 0 0 2px;
}
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  row-gap: 10px;
}

.search {
  display: flex;
  flex: 1 1 10%;
  order: 0;
}
#typeOfSearch {
  width: 100%;
}
#searchTypeContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.listContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  row-gap: 10px;
  width: 1500px;
  border: 1px solid black;
  order: 2;
}

.listItem {
  padding: 8px 24px;
  border-radius: 4px;
  font-size: 16px;
  letter-spacing: 1px;
  order: 1;
  flex-grow: 0;
  flex-basis: 3%;
  flex-shrink: 0;
}
.listItem2 {
  padding: 4px 24px;
  border-radius: 4px;
  font-size: 16px;
  letter-spacing: 1px;
  order: 2;
  flex-grow: 0;
  flex-basis: 300px;
  flex-shrink: 0;
  background: rgba(106, 90, 205, 0.3);
}
.listItem3 {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 16px;
  letter-spacing: 1px;
  order: 3;
  flex-grow: 1;
  background: rgba(75, 175, 80, 0.3);
}
.listItem4 {
  /* padding: 4px 0px;
  border-radius: 4px; */
  /* font-size: 16px; */
  letter-spacing: 1px;
  order: 3;
  flex-grow: 1;
  background: rgba(75, 175, 80, 0.3);
}
.indexMorpheme {
  order: 1;
  flex: 1 1 auto;
}
</style>
