<template>
  <router-view/>
</template>

<script>
import '../src/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

export default {
}
</script>
<style lang="scss">
body{
  background: rgb(246, 248, 250);
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
