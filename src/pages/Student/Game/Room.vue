<template>
  <div class="game-room">
    <div class="title">
      請輸入房間ID
    </div>
    <div>
      <q-input filled bg-color="white" label="房間ID" v-model="roomID"></q-input>
      <q-btn style="margin-top: 5vh;" label="確定" color="primary" @click="goLobby"></q-btn>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      roomID: ''
    }
  },
  methods: {
    goLobby () {
      this.$router.push('/play/' + this.roomID)
    }
  }
}
</script>
<style lang="stylus" scoped>
.game-room
  background-color #B1EDE8
  height 100vh
  padding 20vh 15vw
  text-align center
  font-size 1.2rem
  font-weight bold
  .title
    margin-bottom 5vh
</style>
