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
        >
        </component>
    </q-page-container>

    <q-footer bordered class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>
          <div class="footer">
            <div style="padding: 0 3vw; font-weight: bold;"> {{ nickName }} </div>
            <div style="padding: 0 3vw; font-weight: bold; background-color: pink; border-radius: 1vh;">分數: {{ myScore }}</div>
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
      whichPage: 'answer',
      nickName: '',
      headerTitle: '進入遊戲',
      myScore: 1000,
      waitForTimeOut: false,
      answerButtonDisabled: true,
      myResult: true,
      interval: false,
      addScore: 0,
      currentQuestion: {},
      showPage: false
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
    },
    addScore () {
      // if (this.addScore === this.myScore) return
      window.setTimeout(() => {
        this.interval = window.setInterval(() => {
          if (this.myScore !== this.addScore) {
            this.myScore++
          }
          if (this.addScore === this.myScore) {
            clearInterval(this.interval)
          }
        }, 20)
      }, 2000)
    }
  },
  mounted () {
    // this.$q.loading.show()
    const question = db.collection('currentQuesion')
    question.onSnapshot(res => {
      res.forEach(doc => {
        this.currentQuestion = doc.data()
      })
      console.log('ddd: ', this.currentQuestion)
    })
    // const exam = db.collection('currentExam')
    // let checkExam = false
    // exam.onSnapshot(res => {
    //   res.forEach(doc => {
    //     console.log(doc.data())
    //     if (doc.data().examID === this.id) checkExam = true
    //   })
    //   if (!checkExam) {
    //     this.$q.loading.hide()
    //     this.$router.push('/notExist')
    //     return
    //   }
    //   const playerID = localStorage.getItem('playerID')
    //   if (!playerID) return
    //   db.collection('player').doc(String(playerID)).get()
    //     .then(ele => {
    //       this.nickName = ele.data().playerName
    //       this.myScore = ele.data().score
    //       this.$bus.$emit('changeView', { bool: false, name: this.nickName })
    //     })
    //   const page = db.collection('whichPage')
    //   page.onSnapshot(res => {
    //     res.forEach(doc => {
    //       this.whichPage = doc.data().page
    //     })
    //   })
    //   this.showPage = true
    //   this.$q.loading.hide()
    // })
  },
  methods: {
    setNickName (name) {
      this.nickName = name
    },
    sentAnswer () {
      console.log('se')
      this.waitForTimeOut = true
    },
    setAnswerButtonDisabled () {
      this.answerButtonDisabled = false
    },
    setAddScore (score) {
      this.addScore = this.myScore + score
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
