<template>
  <div>
    <button @click="addInputBox">+</button>
  </div>
</template>

<script>
// import stretchy from "../services/stretchy";

// const Lookup = require("../services/Lookup").default

export default {
  name: "CreateMorpheme",
  props: [],
  data() {
    return {};
  },
  methods: {
    addInputBox() {
      console.log("inputBox added");
    },
  },
};
</script>

<style></style>
