<template>
  <div class='player-answer-list'>
    玩家已作答：
    <transition-group name="fade" class="playerList-ul">
      <li class="li" style="list-style-type:none;" v-for="(elements, index) in playerList" :key="index+elements">
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
      player.where('questionIndex', '==', index).orderBy('answerTime').onSnapshot((ele) => {
        ele.forEach(data => {
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
  border: 1px solid black;
  border-radius: 4px;
  padding: 1vh 1vw;
}
.playerList-ul {
  display: flex;
  padding-left: 0px;
  flex-direction: column;
  margin: 0;
  flex-wrap: wrap;
  height: 91%;
  overflow: hidden;
}
.li {
  font-size: 1em;
  max-width: 20%;
  box-sizing: border-box;
  padding-right: 10px;
  display: inline-block;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
