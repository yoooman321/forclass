<template>
  <div class="question-part">
    <div class="title">
      {{title}}
    </div>
    <div>
      <img class="title-img" v-if="url" :src="url">
    </div>
  </div>
</template>
<script>
// import { getImageUrl } from 'src/backend/index'
export default {
  props: ['title'],
  data () {
    return {
      url: this.$store.state.questionTitleImage
    }
  },
  computed: {
    timeOUt () {
      return this.$store.state.timesOut
    }
  }
  // methods: {
  //   async getUrl () {
  //     this.titleImageUrl = await getImageUrl('questions', this.titleImage)
  //     console.log('titleImageUrl', this.titleImageUrl)
  //   }
  // }
}
</script>
<style lang="stylus" scoped>
.question-part
  text-align: center;
  font-size: 6vh;
  height: 55vh;
  position: relative;
  // border-bottom 1px solid black;

.title {
  /* border-bottom: 1px solid black; */
  width: 70vw;
  font-weight: bold;
  padding-top: 1vh;
  text-align: center;
  margin: 0 auto;
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
