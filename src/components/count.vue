<template>
  <div>{{count}}</div>
</template>
<script>
  export default {
    computed:{
      count () {
        return store.state.count
      }
    }
  }
</script>