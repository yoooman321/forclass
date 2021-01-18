<template>
  <div class='player-answer-list'>
    玩家已作答：
    <transition-group name="fade">
      <li style="list-style-type:none;" v-for="(elements, index) in playerList" :key="index+elements">
        <span>{{elements}}</span>
      </li>
    </transition-group>
  </div>
</template>
<script>
import { db } from 'src/boot/serverConnection'
export default {
  data () {
    return {
      playerList: []
    }
  },
  // data () {
  //   return {
  //     playerList: [],
  //     index: 0,
  //     test: () => {
  //       setInterval(() => {
  //         this.playerList.push(this.index)
  //         this.index++
  //         console.log('pp: ', this.playerList)
  //       }, 3000)
  //     }
  //   }
  // },
  computed: {
    index () {
      return this.$store.state.questionIndex
    }
  },
  methods: {
    watchPlayerAnswer () {
      // const playerInfo = []
      const index = this.index - 1
      const player = db.collection('player')
      console.log('in: ', index)
      player.where('questionIndex', '==', index).orderBy('answerTime').onSnapshot((ele) => {
        console.log('ee: ', this.index)
        ele.forEach(data => {
          console.log('data: ', data.data().playerName)
          console.log('g: ', this.playerList)
          if (!this.playerList.includes(data.data().playerName)) this.playerList.push(data.data().playerName)
        })
      // if (!this.playerlist.includes(data.data().playerName)) this.playerlist.push(data.data().playerName)
      })
      // player.orderBy('answerTime', 'asc').onSnapshot(res => {
      //   res.forEach(data => {
      //     if (!this.playerInfo.includes(data.data().playerName)) this.playerInfo.push(data.data())
      //     console.log('ele: ', data.data())
      //   })
      // })
    }
  },
  created () {
    this.watchPlayerAnswer()
  }
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave {
  opacity: 0;
}
.player-answer-list {
  /* height: 28vh; */
  border: 1px solid black;
  border-radius: 4px;
  padding: 1vh 1vw;
}
</style>
