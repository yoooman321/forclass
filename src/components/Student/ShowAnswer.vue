<template>
  <div class=answer-img :class="correct ? 'correct-bg' : 'wrong-bg'">
    <q-icon class="material-icons text-white" style="font-size: 10rem;">
      check
    </q-icon>
    <div class="result">{{ result }}</div>
    <div class="score" :class="correct ? 'score-plus' : 'score-zero'"> + {{ score }}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      result: '',
      score: 0,
      correct: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.correct = true
    }, 1000)
    setTimeout(() => {
      this.correct = false
    }, 2000)
  },
  methods: {
    changeResult () {
      if (this.correct) {
        this.result = '恭喜答對！'
        this.score = 10
      } else {
        this.result = '答錯了！再接再厲'
        this.score = 0
      }
    }
  },
  watch: {
    correct () {
      this.changeResult()
    }
  }
}
</script>
<style scoped>
.answer-img {
  padding-top: 5vh;
  text-align: center;
  height: calc(100vh - 100px);
  font-size: 2rem;
  font-weight: bold;
}
.result {
  color: white;
}
.score {
  color: white;
  border-radius: 1vh;
  padding: 1vh 0;
  width: 50vw;
  margin: 5vh auto;
}
.correct-bg {
  background-color: #7AC74F;
}
.wrong-bg {
  background-color: #FE4A49;
}
.score-plus {
  background-color: #589B31;
}
.score-zero {
  background-color: #CB0101;
}
</style>
