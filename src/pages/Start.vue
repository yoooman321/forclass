<template>
  <div>
    <div class="qrcode">
      <div class="text">
        掃描QR Code進入遊戲
      </div>
      <vue-qrcode width="200" :value="'http://localhost:8080/start/' + id "  />
      <q-btn class="btn" size="lg" color="deep-purple-10">start it</q-btn>
    </div>
    <div class="play">
      <play-list></play-list>
    </div>
  </div>
</template>
<script>
import VueQrcode from 'vue-qrcode'
import PlayList from '../components/PlayerList/PlayList'
export default {
  data () {
    return {
      id: this.$route.params.id
    }
  },
  components: {
    VueQrcode,
    PlayList
  }
}
</script>
<style lang="stylus" scoped>
@import '~src/css/quasar.variables'
.qrcode
  background #A8E8F0
  height 35vh
  justify-content center
  display flex
  align-items center
  .text
    font-size 20px
    padding 0 2vw
    color $grey-7
    font-weight bold
  .btn
    position absolute
    right 2vh
.play
  height 65vh
  background #F5A65B
</style>
