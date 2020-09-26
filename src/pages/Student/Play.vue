<template>
  <div class="student">
    <Enter-room v-if="lobby" :nickName="nickName" @setNickName="setNickName"></Enter-room>
    <waiting-room v-if="waiting" :nickName="nickName"></waiting-room>
    <games-part v-if="start"></games-part>
  </div>
</template>
<script>
import EnterRoom from './EnterRoom'
import WaitingRoom from './WaitingRoom'
import GamesPart from './GamesPart'
export default {
  data () {
    return {
      id: this.$route.params.id,
      controlPage: 'enter-room',
      lobby: false,
      waiting: false,
      start: true,
      nickName: ''
    }
  },
  components: {
    EnterRoom,
    WaitingRoom,
    GamesPart
  },
  methods: {
    setNickName (name) {
      this.nickName = name
      this.lobby = false
      this.waiting = true
      setTimeout(() => {
        this.waiting = false
        this.start = true
      }, 2000)
    }
  }
}
</script>
<style scoped>
.student {
  background-color: #B1EDE8;
  height: 100vh;
  width: 100vw;
  /* overflow: hidden; */
}
</style>
