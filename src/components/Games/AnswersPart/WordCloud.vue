<template>
  <div style="width: 78vw; height: 60vh; margin-left: 1vw;">
    <vue-word-cloud
      :words="words"
      :color="() => { return colorList[Math.floor(Math.random()*15)] }"
      :spacing="0"
      font-family="Roboto"
    />
  </div>
</template>
<script>
import VueWordCloud from 'vuewordcloud'
import { db } from 'src/boot/serverConnection'
export default {
  components: {
    [VueWordCloud.name]: VueWordCloud
  },
  data () {
    return {
      words: [],
      playersAnswer: [],
      organizedObject: {},
      colorList: ['#F7AEF8', '#B388EB', '#8093F1', '#72DDF7', '#190E4F', '#FCAA67', '#B0413E', '#00FFC5', '#473335', '#663F46', '#5E5C6C', '#FF331F', '#E98A15', '#ABC798', '#E54F6D', '#0496FF']
    }
  },
  created () {
    this.watchPlayerAnswer()
  },
  watch: {
    playersAnswer () {
      this.organizedWordList()
    }
  },
  computed: {
    index () {
      return this.$store.state.questionIndex
    }
  },
  methods: {
    watchPlayerAnswer () {
      const player = db.collection('player')
      const index = this.index - 1
      player.where('questionIndex', '==', index).onSnapshot((querySnapshot) => {
        this.playersAnswer = []
        querySnapshot.forEach(doc => {
          const eachAnswerList = doc.data().answer.map(ele => ele)
          this.playersAnswer = this.playersAnswer.concat(eachAnswerList)
        })
      })
    },
    organizedWordList () {
      this.organizedObject = this.playersAnswer.reduce((acc, cur) => {
        if (acc[cur]) {
          acc[cur] = acc[cur] + 1
          return acc
        } else {
          acc[cur] = 1
          return acc
        }
      }, {})
      this.words = Object.keys(this.organizedObject).map(ele => {
        return [ele, this.organizedObject[ele]]
      })
    }
  }
}
</script>
