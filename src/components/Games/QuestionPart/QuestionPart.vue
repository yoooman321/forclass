<template>
  <div class="question-part">
    <div class="title" :class="titleSize">
      {{title}}
    </div>
    <div>
      <img class="title-img" v-if="imageUrl" :src="imageUrl">
    </div>
  </div>
</template>
<script>
// import { getImageUrl } from 'src/backend/index'
export default {
  props: {
    title: {
      type: String
    },
    imageUrl: {
      type: String
    }
  },
  data () {
    return {
      titleSize: ''
    }
  },
  created () {
    switch (true) {
      case this.title.length > 250:
        this.titleSize = 'title-large'
        break
      case this.title.length > 150:
        this.titleSize = 'title-medium'
        break
      default:
        this.titleSize = 'title-small'
        break
    }
  }
}
</script>
<style lang="stylus" scoped>
.question-part
  text-align: center;
  // font-size: 6vh;
  height: 55vh;
  position: relative;
  // border-bottom 1px solid black;

.title {
  /* border-bottom: 1px solid black; */
  max-height: 25vh;
  font-weight: bold;
  padding-top: 1vh;
  text-align: center;
  margin: 0 12vw;
}
.title-large {
  font-size: 2em;
}
.title-medium {
  font-size: 2.5em;
}
.title-small {
  font-size: 3em;
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
</style>
