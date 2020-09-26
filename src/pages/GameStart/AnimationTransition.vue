<template>
  <div class="cutTo">
    <!-- <transition> -->
      <!-- <div class="animate__animated animate__slideInRight"> -->
        <div class="title animate__animated animate__slideInRight">Question 1</div>
        <div v-if="showTitle" class="counted">{{counter}}</div>
        <!-- <div class="counted animate__animated animate__zoomIn animate__repeat-3">test</div> -->
        <!-- <div class="counted">2</div>
        <div class="counted">1</div>
        <div class="counted">GO</div> -->
      <!-- </div> -->
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      showTitle: false,
      counter: 3,
      timer: null
    }
  },
  mounted () {
    setTimeout(() => {
      this.showTitle = true
      this.counting()
    }, 4000)
  },
  methods: {
    counting () {
      this.timer = setInterval(() => {
        this.counter--
      }, 1000)
    },
    changeState () {
      setTimeout(() => {
        this.$bus.$emit('changeState')
      }, 1000)
    }
  },
  watch: {
    counter (val) {
      if (val === 0) {
        clearInterval(this.timer)
        this.counter = 'GO!'
        this.changeState()
      }
    }
  }
}
</script>
<style scoped>
.cutTo {
  height: 100vh;
  width: 100vw;
  background: url('../../assets/bg.png');
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
}
.title {
  text-align: center;
  padding-top: 12vh;
  font-size: 7vw;
  font-weight: bold;
}
.animate__animated.animate__slideInRight {
  animation-duration: 2s;
  animation-delay: 1s;
}
.counted {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 5.5vw;
  left: 0;
  top: 40%;
  font-weight: bold;
  opacity: 0;
  animation: zoom 1s ease-in-out 4;
}
@keyframes zoom{
  0% {
    transform: scale(1.0);
    opacity: 0;
  }
  5% {
    transform: scale(1.0);
    opacity: 100%;
  }
  49% {
    transform: scale(1.0);
    opacity: 100%;
  }
  100% {
    transform: scale(4.0);
    opacity: 0;
  }
}
</style>
