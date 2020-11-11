<template>
  <div class="not-exist">
    <div class="title">
      此ID無效
    </div>
    <router-link :to="{name: 'Room'}">
      <div>重新輸入房間ID</div>
    </router-link>
  </div>
</template>
<style lang="stylus" scoped>
.not-exist
  height 100vh
  background #E9F1F7
  padding-top 20vh
  text-align center
  font-size 1.5rem
  .title
    margin-bottom 5vh
</style>
