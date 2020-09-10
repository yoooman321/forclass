<template>
  <div class="cutTo">
    <!-- <transition> -->
      <!-- <div class="animate__animated animate__slideInRight"> -->
        <div class="title animate__animated animate__slideInRight">Question 1</div>
        <div v-if="showTitle" class="counted animate__animated animate__zoomIn animate__infinite">{{counter}}</div>
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
      // console.log('aa')
    }, 4000)
  },
  methods: {
    counting () {
      const self = this
      self.timer = setInterval(() => {
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
    counter () {
      if (this.counter === 0) {
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
  position: relative;
}
.title {
  text-align: center;
  padding-top: 15vh;
  font-size: 50px;
  font-weight: bold;
}
.animate__animated.animate__slideInRight {
  --animate-duration: 2s;
  --animate-delay: 2s;
}
.animate__animated.animate__slideOutLeft {
  --animate-duration: 2s;
  --animate-delay: 6s;
}
.counted {
  position: absolute;
  font-size: 50px;
  left: 48%;
  top: 30%;
  font-weight: bold;
  /* text-align: center; */
}
.animate__animated.animate__zoomIn {
  --animate-duration: 1s;
  --animate-delay: 4s;
  /* --animate-repeat: infinite; */
}
</style>
