<template>
  <div>
    <div class="qrcode">
      <div class="text">
        掃描QR Code進入遊戲
      </div>
      <vue-qrcode  :value="location"  />
      <div class="text"> or  輸入網址：{{ location }} </div>
    </div>
  </div>
</template>
<script>
import VueQrcode from 'vue-qrcode'
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      location: ''
      // currentExamID: this.$store.state.currentExam
    }
  },
  components: {
    VueQrcode
  },
  created () {
    this.location = 'http://' + window.location.hostname + '/#/play/' + this.id
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
    font-size 20px
</style>
