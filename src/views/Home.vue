<template>
<div>
<div class="toolkit">
  <div class="searchdiv">
    <SearchLexicon />
  </div>
  <div class="createmorpheme">
    <MorphemeBreakdown/>
  </div>
  </div>
  </div>
</template>

<script>
import SearchLexicon from "../components/SearchLexicon";
import MorphemeBreakdown from "../components/MorphemeBreakdown";
export default {
  name: "Home",
  components: { SearchLexicon, MorphemeBreakdown },
  data() {
    return {
      results: "",
    };
  },
  methods: {},
};
</script>

<style scoped>
.toolkit {
    /* display: flex; */
}.searchdiv{
  border: 2px solid black;
  /* background-color: black; */
  /* color: white */
}
.createmorpheme{
  border: 2px solid black;
}
</style>