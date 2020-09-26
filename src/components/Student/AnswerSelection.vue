<template>
  <div>
    <div class="answerSelection">
      <div
        v-for="(option, index) in options"
        :key="index"
        :style="{backgroundColor: answerOptions[index].bgColor}"
        class="answers"
        @click="chooseAnswer(index)"
        :class="{'not-choose-answer': answer !== index && answer !== -1}"
      >
        {{ answerOptions[index].options }}
      </div>
    </div>
    <div class="loading" v-if="hasAnswer">
      <img :src="loading" />
      <div style="text-align: center; font-size: 2rem; font-weight: bold;">等待解答...</div>
    </div>
  </div>
</template>
<script>
import loading from 'src/assets/loading.gif'
export default {
  data () {
    return {
      answerOptions: [
        { options: '①', bgColor: 'green' },
        { options: '②', bgColor: 'yellow' },
        { options: '③', bgColor: 'blue' },
        { options: '④', bgColor: 'red' },
        { options: '④', bgColor: 'white' }
      ],
      options: [
        { value: 'a', isAnswer: false, type: '文字', file: null },
        { value: 'b', isAnswer: true, type: '文字', file: null },
        { value: 'c', isAnswer: false, type: '文字', file: null },
        { value: 'd', isAnswer: false, type: '文字', file: null },
        { value: 'd', isAnswer: false, type: '文字', file: null }
      ],
      hasAnswer: false,
      answer: -1,
      loading
    }
  },
  methods: {
    chooseAnswer (index) {
      if (!this.hasAnswer) {
        this.hasAnswer = true
        // this.answer = index
      }
    }
  }
}
</script>
<style scoped>
.answerSelection {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 100px);
  /* align-items: center */
}
.loading {
  height: calc(100vh - 100px);
  position: fixed;
  top: 50px;
  width: 100vw;
  background-color: white;
  opacity: .6;
}
.loading > img {
  /* height: 50%; */
  padding-top: 15vh;
  width: 100%;
}
.answers {
  width: 50vw;
  text-align: center;
  font-size: 2rem;
}
.not-choose-answer {
  opacity: 0.3;
}
</style>
<style>
.q-toolbar {
  height: 50px;
}
</style>
