<template>
<!-- v-if="showPage"  -->
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-black text-white" >
      <q-toolbar>
        <q-toolbar-title>
          <div class="header">
            <div style="text-align: center; font-weight: bold">{{ headerTitle }}</div>
            <q-btn v-if="whichPage === 'answer'" label="答案確定" color="secondary" class="confirm-btn" @click="sentAnswer" :disable="answerButtonDisabled"></q-btn>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
        <component
          :waitForTimeOut="waitForTimeOut"
          :class="whichPage !== 'final' ? 'content' : 'final'"
          :is="whichPage"
          @setNickName="setNickName"
          @setAnswerButtonDisabled="setAnswerButtonDisabled"
          :myResult="myResult"
          @setAddScore="setAddScore"
          :currentQuestion="currentQuestion"
          :myScore="myScore"
          @getResult="getResult"
          :addScore="addScore"
        >
        <!-- :questionIndex="questionIndex" -->
        </component>
    </q-page-container>

    <q-footer bordered class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>
          <div class="footer">
            <div style="padding: 0 3vw; font-weight: bold;"> {{ nickName }} </div>
            <div style="padding: 0 3vw; font-weight: bold; background-color: pink; border-radius: 1vh;">答對題數: {{ myScore }}</div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
import Lobby from 'src/components/Student/Lobby'
import AnimationTransition from 'src/components/Student/AnimationTransition'
import Answer from 'src/components/Student/Answer'
import Ranking from 'src/components/Student/Ranking'
import Final from 'src/components/Student/Final'
import { db } from 'src/boot/serverConnection'
export default {
  data () {
    return {
      id: this.$route.params.id,
      whichPage: '',
      nickName: '',
      headerTitle: '進入遊戲',
      myScore: 0,
      waitForTimeOut: false,
      answerButtonDisabled: true,
      myResult: true,
      interval: false,
      finalScore: 0,
      currentQuestion: {},
      showPage: false,
      addScore: 0
      // questionIndex: 0
    }
  },
  components: {
    Lobby,
    AnimationTransition,
    Answer,
    Ranking,
    Final
  },
  watch: {
    whichPage () {
      this.waitForTimeOut = false
      this.answerButtonDisabled = true
      this.$q.loading.hide()
    },
    finalScore () {
      // if (this.addScore === this.myScore) return
      window.setTimeout(() => {
        this.interval = window.setInterval(() => {
          if (this.myScore !== this.finalScore) {
            this.myScore++
          }
          if (this.finalScore === this.myScore) {
            clearInterval(this.interval)
          }
        }, 20)
      }, 2000)
    }
  },
  mounted () {
    // this.$q.loading.show()
    const exam = db.collection('currentExam')
    let checkExam = false
    exam.onSnapshot(res => {
      res.forEach(doc => {
        if (doc.data().examID === this.id) checkExam = true
      })
      if (!checkExam) {
        this.$q.loading.hide()
        this.$router.push('/notExist')
        return
      }
      const question = db.collection('currentQuestion')
      question.onSnapshot(res => {
        res.forEach(doc => {
          this.currentQuestion = doc.data()
        })
      })
      const playerID = localStorage.getItem('playerID')
      if (playerID !== null) {
        db.collection('player').doc(String(playerID)).get()
          .then(ele => {
            this.nickName = ele.data().playerName
            this.myScore = ele.data().score
            this.$bus.$emit('changeView', { bool: false, name: this.nickName })
          })
      }
      const page = db.collection('whichPage')
      page.onSnapshot(res => {
        res.forEach(doc => {
          this.whichPage = doc.data().page
          // console.log('page: ', this.whichPage)
          // if (this.whichPage === 'ranking') this.questionIndex++
        })
      })
      this.showPage = true
      this.$q.loading.hide()
    })
  },
  methods: {
    setNickName (name) {
      this.nickName = name
    },
    sentAnswer () {
      this.waitForTimeOut = true
    },
    setAnswerButtonDisabled () {
      this.answerButtonDisabled = false
    },
    setAddScore (score) {
      this.finalScore = this.myScore + score
    },
    getResult (score, result) {
      this.myResult = result
      this.addScore = score
    }
  }
}
</script>
<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
}
.confirm-btn {
  position: absolute;
  right: 5px;
  top: 8px;
}
.content {
  width: 100vw;
  height: calc(100vh - 100px);
  background-color: #B1EDE8;
}
.final {
  width: 100vw;
  height: calc(100vh - 100px);
  background-color: #009FB7;
}
</style>
