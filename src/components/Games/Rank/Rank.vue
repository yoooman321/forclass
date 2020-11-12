<template>
  <div class="rank">
    <div class="test">
      <div>
        <div class="score">{{ players[1].score }}</div>
        <div class="player-name">{{ players[1].playerName }}</div>
        <div class="ranking no2"></div>
      </div>
      <div>
        <div class="score">{{ players[0].score }}</div>
        <div class="player-name">{{ players[0].playerName }}</div>
        <div class="ranking no1"></div>
      </div>
      <div>
        <div class="score">{{ players[2].score }}</div>
        <div class="player-name">{{ players[2].playerName }}</div>
        <div class="ranking no3"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Rank01 from '../../../assets/ranking01.png'
import Rank02 from '../../../assets/ranking02.png'
import Rank03 from '../../../assets/ranking03.png'
export default {
  props: {
    players: {
      type: Array,
      default: () => [{ playerName: '', score: 0 }]
    }
  },
  data () {
    return {
      Rank01,
      Rank02,
      Rank03,
      rank01show: false,
      rank02show: false,
      rank03show: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.rank03show = true
    }, 2000)
    setTimeout(() => {
      this.rank02show = true
    }, 3000)
    setTimeout(() => {
      this.rank01show = true
    }, 5000)
  }
}
</script>
<style scoped>
.test {
  display:flex;
  align-items: flex-end;
  justify-content: center;
  margin-top: 5vh;
  border-bottom: 1px solid black;
}
.no1 {
  height: 40vh;
  background: url('../../../assets/ranking01.png');
}
.no2 {
  height: 25vh;
  background: url('../../../assets/ranking02.png');
}
.no3 {
  height: 16vh;
  background: url('../../../assets/ranking03.png');

}
.ranking {
  width: 10vw;
  background-repeat: no-repeat;
  background-size: 9vw;
  background-position-x: center;
  background-position-y: 1vh;
  background-color: #009FB7;
  border: 1px solid black;
}
.player-name {
  font-size: 2em;
  text-align: center;
  font-weight: bold;
  margin-bottom: 1vh;
}
.score {
  color: white;
  text-align: center;
  font-size: 1.2rem
}
.rank {
  margin: auto 0;
}
.rank-title {
  /* text-align: center; */
  font-weight: bold;
  font-size: 1.5rem;
}
.num {
  display: flex;
  margin: 2vh 0;
  align-items: center;
  align-self: center;
  justify-content: center;
}

.playername {
  text-align: center;
  font-weight: bold;
  align-self: center;
  align-items: center;
  font-size: 3em;
  margin-left: 4vw;
}
.slide-enter {
  /* transform: translateY(20px); */
  opacity: 0;
}
.slide-enter-active {
  /* transition: opacity 1s; */
  transition: opacity .5s;
  animation: slide-in 1s ease-in-out forwards;
}
.fade-enter {
  /* opacity: 0; */
}
.fade-enter-active {
  /* transition: opacity .5s; */
  animation: fade-in 2s ease-in forwards;
}
@keyframes slide-in {
  0% {
    transform: translateX(-30px);
  }
  50% {
    transform: translateX(40px);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  10% {
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  20% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  30% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
