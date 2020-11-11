<template>
  <div class="play">
    <div class="playerList">
      玩家名單(過30秒若沒有你的名字請重新進入)
      <div class="total-player">目前人數：{{ playerlist.length }}人</div>
    </div>
    <div class="player" v-for="(player, index) in playerlist" :key="index">
      {{ player }}
    </div>
  </div>
</template>
<script>
import { db } from 'src/boot/serverConnection'
export default {
  data () {
    return {
      playerlist: []
    }
  },
  mounted () {
    const player = db.collection('player')
    player.onSnapshot(res => {
      res.forEach(data => {
        if (!this.playerlist.includes(data.data().playerName)) this.playerlist.push(data.data().playerName)
      })
    })
  }
}
</script>
<style lang="stylus" scoped>
.play
  height 65vh
  background #F5A65B
  .playerList
    display flex
    padding 2vh
    color #0C120C
    font-weight bold
    font-size 18px
    .total-player
      position absolute
      right 2vh
  .player
    float left
    padding 0 2vh
    font-size 16px
    width 120px
    font-weight bold
</style>
