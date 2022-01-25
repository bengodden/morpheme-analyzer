<template>
  <div class="container">
    <label class="flexItem">Add Morpheme to Index: </label>
    <input class="flexItem" v-model="inputMorpheme" placeholder="morpheme" />
    <input
      class="flexItem"
      v-model="inputDefinition"
      placeholder="definition"
    />
    <button class="flexItem" @click="addMorpheme">Index Morpheme</button>
  </div>
</template>

<script>
import stretchy from "../services/stretchy";

export default {
  name: "IndexMorpheme",
  props: [],
  data() {
    return {
      inputMorpheme: null,
      inputDefinition: null,
    };
  },
  methods: {
    async addMorpheme() {
      if (this.inputMorpheme) {
        let result;
        try {
          result = await stretchy.indexMorpheme(
            this.morphemeIndex,
            this.inputMorpheme,
            this.inputDefinition
          );
        } catch (error) {
          console.log(error);
        }

        console.log(
          `Morpheme ${this.inputMorpheme} was added to index: ${this.morphemeIndex}`
        );

        this.$store.commit("ADD_MORPHEME_TO_LIST", {
          id: result._id,
          morpheme: this.inputMorpheme,
          definition: this.inputDefinition,
        });
        this.inputMorpheme = null;
        this.inputDefinition = null;
      }
    },
  },
  computed: {
    morphemeIndex() {
      return this.$store.state.morphemeIndex;
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
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  row-gap: 10px;
}
flexItem {
  flex: 1 1 auto;
  justify-content: flex-start;
  align-content: center;
}
</style>
