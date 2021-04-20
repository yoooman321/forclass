<template>
  <div>
    <div class="qrcode">
      <div class="text">
        掃描QR Code進入遊戲
      </div>
      <div @click="qrcode = true" class="qrcode-image">
        <vue-qrcode  :value="location" />
      </div>
      <div class="text"> or  輸入網址：{{ location }} </div>
    </div>
    <q-dialog v-model="qrcode" full-height full-width>
      <vue-qrcode  :value="location" :width="height" />
    </q-dialog>
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
      location: '',
      qrcode: false,
      height: 0
    }
  },
  components: {
    VueQrcode
  },
  created () {
    this.location = 'http://' + window.location.hostname + '/#/play/' + this.id
    const min = Math.min(document.documentElement.clientHeight, document.documentElement.clientWidth)
    this.height = min - 50
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
  .qrcode-image
    cursor pointer
  .btn
    position absolute
    right 2vh
    font-size 20px
</style>
