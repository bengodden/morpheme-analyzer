<template>
  <div>
    <div class="toolkit">
      <div class="searchdiv">
        <SearchLexicon />
      </div>
    </div>
  </div>
</template>

<script>
import SearchLexicon from "../components/SearchLexicon";

export default {
  name: "Home",
  components: { SearchLexicon },
  data() {
    return {
      results: "",
      currentindex: "morphemes",
    };
  },
};
</script>

<style scoped>
.toolkit {
  /* display: flex; */
}
.searchdiv {
  border: 2px solid black;
  /* background-color: black; */
  /* color: white */
}
.createmorpheme {
  border: 2px solid black;
}
</style>
