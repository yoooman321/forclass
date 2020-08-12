<template>
  <div class="playerList">
    玩家名單(過30秒若沒有你的名字請重新進入)
    <div class="total-player">目前人數：0人</div>
  </div>
</template>
<style lang="stylus" scoped>
.playerList
  display flex
  padding 2vh
  color #0C120C
  font-weight bold
  font-size 18px
  .total-player
    position absolute
    right 2vh
</style>
