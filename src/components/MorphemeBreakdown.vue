<template>
  <div>
    <div data-app>
      <h3>Morphemes:</h3>
      <div class="autocomplete">
        <v-autocomplete
          :items="morphemeList"
          item-text=".morpheme"
          v-model="selectedMorphemes"
          multiple
          chips
          deletable-chips
          hide-selected
        >
        </v-autocomplete>
      </div>
      <!-- <h3>selectedMorphemes: {{ selectedMorphemes }}</h3>
      <div v-for="each in morphemeList" :key="each._id">
        <div>{{ each.morpheme }}</div>
      </div> -->

      <div class="indexmorpheme">
        <IndexMorpheme
          @morpheme-added="onAddMorpheme"
          v-bind:currentindex="currentindex"
        />
      </div>
    </div>
  </div>
</template>

<script>
import stretchy from "../services/stretchy";
import IndexMorpheme from "../components/IndexMorpheme.vue";
export default {
  name: "CreateMorpheme",
  components: { IndexMorpheme },
  props: [],
  created() {
    stretchy.wholeIndex(this.currentindex).then((response) => {
      this.morphemeList = response;
      console.log(`Initial length of morphemeList is: ${response.length}`);
    });
  },
  data() {
    return {
      morphemeList: [],
      checkedBoxes: [],
      currentindex: "morphemes",
      selectedMorphemes: [],
    };
  },
  methods: {
    onAddMorpheme(newItem) {
      this.morphemeList.push(newItem);
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
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
.autocomplete {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  min-height: 1em;
  max-height: 6em;
  overflow: hidden;
  position: relative;
}
</style>
