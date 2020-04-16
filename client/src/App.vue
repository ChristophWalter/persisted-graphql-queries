<template>
  <div id="app">
    <h1>Hello World!</h1>
    <div v-for="continent in continents" :key="continent.code">
      {{ continent.name }}
    </div>
  </div>
</template>

<script>
import ContinentsQuery from "../queries/continents.graphql"
export default {
  name: "App",
  data() {
    return {
      continents: [],
    }
  },
  apollo: {
    continents: ContinentsQuery,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
