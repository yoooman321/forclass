<template>
  <div class="ansPart">
    <div
      v-for="(ans, index) in ansStyle"
      :key="index"
      class="answer"
      :style="{backgroundColor: ans.bgColor}"
      :class="{lastans: (index === ansStyle.length-1 && ansStyle.length % 2 === 1), isAnswer: (options[index].isAnswer === false && timesout)}"
      >
      <div class="selection">{{ans.options}}</div>
      {{options[index].value}}
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ansStyle: [
        { options: '①', bgColor: 'green' },
        { options: '②', bgColor: 'yellow' },
        { options: '③', bgColor: 'blue' },
        { options: '④', bgColor: 'red' },
        { options: '④', bgColor: 'white' }],
      options: [
        { value: 'a', isAnswer: false, type: '文字', file: null },
        { value: 'b', isAnswer: true, type: '文字', file: null },
        { value: 'c', isAnswer: false, type: '文字', file: null },
        { value: 'd', isAnswer: false, type: '文字', file: null },
        { value: 'd', isAnswer: false, type: '文字', file: null }],
      timesout: false
    }
  },
  computed: {
    // oddAns () {
    // return (this.ansStyle)
    // }
  }
}
</script>
<style scoped>
.ansPart {
  display: flex;
  flex-wrap: wrap;
  height: 50vh;
}
.answer{
  width: 50vw;
  /* margin: 1vh 1vw; */
  text-align: center;
  font-size: 50px;
  background-color: yellow;
  border: 0.5px solid black;
  /* border-radius: 1vh; */
  /* height: 100% */
}
.selection {
  display: inline-block;
  margin-right: 1vw;
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
</style>
