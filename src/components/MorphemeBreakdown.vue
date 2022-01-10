<template>
  <div>
    <div data-app>
      <h3>Morphemes:</h3>
      <!-- <v-autocomplete :morphemeList="morphemeList"></v-autocomplete> -->

      <v-autocomplete
        :items="currentMorphemes"
        item-text="_source.morpheme"
        v-model="selectedMorphemes"
        multiple
        chips
        deletable-chips
        hide-selected
      >
      </v-autocomplete>
      <h3>selectedMorphemes: {{ selectedMorphemes }}</h3>
      <div v-for="each in morphemeList" :key="each._id">
        <div>{{ each._source.morpheme }}</div>
      </div>

      <div class="indexmorpheme">
        <IndexMorpheme @morpheme-added="listMorphemes" />
      </div>
    </div>
  </div>
</template>

<script>
import stretchy from "../services/stretchy";
import IndexMorpheme from "../components/IndexMorpheme.vue";


  function compare( a, b ) {
  if ( a._source.morpheme < b._source.morpheme ){
    return -1;
  }
  if ( a._source.morpheme > b._source.morpheme ){
    return 1;
  }
  return 0;
}

export default {
  name: "CreateMorpheme",
  components: { IndexMorpheme },
  props: [],
  created() {
    stretchy.wholeIndex(this.currentIndex).then((response) => {
      this.morphemeList = response;
      // response.forEach((element) => {
      //   // console.log(element);
      //   this.morphemeList.push(element);
      // });
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
      console.log("listMorphemes called");
      this.morphemeList.splice(0, this.morphemeList.length);
      console.log(`morphemeList.length is now: ${this.morphemeList.length}`);
      stretchy
        .wholeIndex(this.currentIndex)
        .then((response) => {
          console.log(`morphemeList is:`, response);
          this.morphemeList = response;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  computed: {
    currentMorphemes() {
    
      return [...this.morphemeList].sort(compare);
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
</style>
