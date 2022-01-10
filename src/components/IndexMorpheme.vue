<template>
  <div>
    <label>Add Morpheme to Index: </label>
    <input v-model="inputMorpheme" placeholder="morpheme" />
    <input v-model="inputDefinition" placeholder="definition" />
    <button @click="addMorpheme">Index Morpheme</button>
  </div>
</template>

<script>
import stretchy from "../services/stretchy";

export default {
  name: "IndexMorpheme",
  props: ["currentindex"],
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
            this.currentindex,
            this.inputMorpheme,
            this.inputDefinition
          );
        } catch (error) {
          console.log(error);
        }

        console.log(
          `Morpheme ${this.inputMorpheme} was added to index: ${this.currentindex}`
        );

        this.$emit("morpheme-added", {
          id: result._id,
          morpheme: this.inputMorpheme,
          definition: this.inputDefinition,
        });
        this.inputMorpheme = null;
        this.inputDefinition = null;
      }
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
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
</style>
