<template>
  <div class="question-part">
    <div class="title">
      {{title}}
    </div>
    <div>
      <img class="title-img" :src="img">
    </div>
    <div class="button">
      <q-btn color="secondary" label="next" size="xl" @click="test"></q-btn>
    </div>
  </div>
</template>
<script>
import pigg from '../../../assets/ikea.png'
export default {
  data () {
    return {
      title: 'test',
      img: pigg
    }
  },
  methods: {
    test () {
      // this.title = 'test2'
      this.$bus.$emit('playBackgroundMusic')
    }
  }
}
</script>
<style lang="stylus" scoped>
.question-part
  text-align: center;
  font-size: 6vh;
  height: 50vh;
  position: relative;
  // border-bottom 1px solid black;

.title {
  /* border-bottom: 1px solid black; */
  font-weight: bold;
  padding-top: 1vh;
}
.noImg {
  padding-top: 25vh;
}
.title-img {
  padding-top: 2vh;
  height: 35vh;
  // width: 50vw
  max-width 50vw;
}
.button {
  position: absolute;
  bottom: 10vh;
  right: 7vw;
}
</style>
