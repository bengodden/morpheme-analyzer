<template>
  <div>
    <div data-app>
      <div class="autocomplete">
        <v-autocomplete
          :items="morphemeList"
          :item-text="(item) => item.morpheme + ' - ' + item.definition"
          :item-value="(item) => item.id"
          v-model="selectedMorphemes"
          multiple
          chips
          deletable-chips
          hide-selected
        >
        </v-autocomplete>
      </div>
    </div>
  </div>
</template>

<script>
import stretchy from "../services/stretchy";
// import { store } from "../store/store";

export default {
  name: "CreateMorpheme",
  components: {},
  props: ["result"],
  created() {
    stretchy.wholeIndex(this.morphemeIndex).then((response) => {
      this.setMorphemeList(response);
      console.log(`Initial length of morphemeList is: ${response.length}`);
    });
  },
  data() {
    return {
      selectedMorphemes: [],
    };
  },
  methods: {
    setMorphemeList(list) {
      this.$store.commit("SET_MORPHEME_LIST", list);
    },
  },
  computed: {
    morphemeList() {
      return this.$store.state.morphemeList;
    },
    morphemeIndex() {
      return this.$store.state.morphemeIndex;
    },
  },
};
</script>

<style scoped>
/* button {
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
} */
.autocomplete {
  /* overflow: hidden; */
}
</style>
