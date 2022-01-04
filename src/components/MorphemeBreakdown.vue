<template>
  <div>
    <div data-app>
      <h3>Morphemes:</h3>
      <!-- <v-autocomplete :morphemeList="morphemeList"></v-autocomplete> -->
      
      <v-autocomplete
        :items="morphemeList"
        item-text="_source.morpheme"
        v-model="selectedMorphemes"
        multiple
        chips
        deletable-chips
        hide-selected
      >
      </v-autocomplete>
    <h3>selectedMorphemes: {{selectedMorphemes}}</h3>
      <button @click="listMorphemes">List Morphemes</button>
      <div v-for="morpheme in morphemeList" :key="morpheme._id">
        <input
          type="checkbox"
          :id="morpheme._id"
          :value="morpheme._id"
          v-model="checkedBoxes"
        />
        <label :for="morpheme._id">
          {{ morpheme._source.morpheme }} -
          {{ morpheme._source.definition }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import stretchy from "../services/stretchy";
// stretchy.wholeIndex('testdelete')
// const Lookup = require("../services/Lookup").default

export default {
  name: "CreateMorpheme",
  props: [],
  created(){
      stretchy.wholeIndex(this.currentIndex)
      .then((response) => {
        response.forEach((element) => {
        console.log(element)
        this.morphemeList.push(element);
        });
      });
    },
  data() {
    return {
      morphemeList: [],
      checkedBoxes: [],
      currentIndex: "testdelete",
      selectedMorphemes: [],
    };
  },
  methods: {
    listMorphemes() {
      this.morphemeList = [];
      stretchy.wholeIndex(this.currentIndex)
      .then((response) => {
        response.forEach((element) => {
        console.log(element)
        this.morphemeList.push(element);
        });
      });
    },
  }
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

/* label {
  color: black;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
} */
</style>
