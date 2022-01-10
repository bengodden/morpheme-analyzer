<template>
  <div>
    <div data-app>
      <h3>Morphemes:</h3>
      <v-autocomplete :morphemeList="morphemeList"></v-autocomplete>

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
      <h3>selectedMorphemes: {{ selectedMorphemes }}</h3>
      <div v-for="each in morphemeList" :key="each._id">
        <div>{{ each.morpheme }}</div>
      </div>

      <div class="indexmorpheme">
        <IndexMorpheme @morpheme-added="listMorphemes" v-bind:currentindex="currentindex"/>
      </div>
    </div>
  </div>
</template>

<script>
import stretchy from "../services/stretchy";
import IndexMorpheme from "../components/IndexMorpheme.vue";

// function compare(a, b) {
//   if (a._source.morpheme < b._source.morpheme) {
//     return -1;
//   }
//   if (a._source.morpheme > b._source.morpheme) {
//     return 1;
//   }
//   return 0;
// }

export default {
  name: "CreateMorpheme",
  components: { IndexMorpheme },
  props: [],
  created() {
    stretchy.wholeIndex(this.currentindex).then((response) => {
    this.morphemeList=response
    console.log(`Initial length of morphemeList is: ${response.length}`)
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
    listMorphemes() {
      console.log(`listmorphemes() called on ${this.currentindex}`)
      stretchy
        .wholeIndex(this.currentindex)
        .then((response) => {
          console.log(`stretchy returned ${response.length} results. morphemeList is currently ${this.morphemeList.length} long`)
          let difference = response.filter(({'id':id1})=> !this.morphemeList.some(({ 'id': id2}) => id2 === id1))
          difference.forEach(x => {
            console.log(`difference: ${x.morpheme}`)
            this.morphemeList.push(x)
          })
          console.log(`difference is ${difference.length} long`)
          console.log(`morphemeList is now: ${this.morphemeList.length} long`)
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
</style>
