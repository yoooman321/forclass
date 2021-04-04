<template>
  <div class="ansPart">
    <div
      v-for="(ans, index) in options"
      :key="index"
      class="answer"
      :style="{backgroundColor: ansStyle[index].bgColor}"
      :class="{lastans: (index === options.length-1 && options.length % 2 === 1), isAnswer: (ans.isAnswer === false && timeOut)}"
      >
      <div class="selection">{{ansStyle[index].number}}</div>
      <div v-if="ans.value"> {{ans.value}} </div>
      <div v-else>
        <img class="answer-img" :src="ans.imageUrl">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['options'],
  data () {
    return {
      ansStyle: this.$store.state.optionListSetting
    }
  },
  computed: {
    timeOut () {
      return this.$store.state.timesOut
    }
  }
}
</script>
<style scoped>
.ansPart {
  display: flex;
  flex-wrap: wrap;
  height: 45vh;
}
.answer{
  width: 50vw;
  /* margin: 1vh 1vw; */
  text-align: center;
  font-size: 2em;
  background-color: yellow;
  border: 0.5px solid black;
  /* border-radius: 1vh; */
  /* height: 100% */
}
.selection {
  display: inline-block;
  /* margin-right: 1vw; */
}
.lastans {
  width: 100vw;
  /* background-color: black; */
  /* font-size: 30px; */
}
.isAnswer {
  opacity: 0.1;
  /* background-color: black; */
}
.answer-img {
  height: 100%;
  max-height: 15vh;
}
</style>
