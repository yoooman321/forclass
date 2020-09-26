<template>
  <div>
    <div class="rank-title">最快排行榜</div>
    <div class="num">
      <img class="ranking" :src="Rank01" >
      <transition name = "fade">
        <div v-if="rank01show" class="playername">Player1</div>
      </transition>
    </div>
    <div class="num">
      <img class="ranking" :src="Rank02" >
      <transition name = "slide">
        <div v-if="rank02show" class="playername">Player2</div>
      </transition>
    </div>
    <div class="num">
      <img class="ranking" :src="Rank03" >
      <transition name="slide">
        <div v-if="rank03show" class="playername">Player3</div>
      </transition>
    </div>
  </div>
</template>
<script>
import Rank01 from '../../../assets/ranking01.png'
import Rank02 from '../../../assets/ranking02.png'
import Rank03 from '../../../assets/ranking03.png'
export default {
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
.rank-title {
  /* text-align: center; */
  font-weight: bold;
  font-size: 1.5vw;
}
.num {
  display: flex;
  margin: 2vh 0;
  align-items: center;
  align-self: center;
}
.ranking {
  width: 8vw;
}
.playername {
  width: 8vw;
  text-align: center;
  font-weight: bold;
  align-self: center;
  align-items: center;
  font-size: 1.5vw;
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
