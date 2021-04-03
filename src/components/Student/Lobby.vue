<template>
  <div class="play-page">
    <div v-if="notFillNickName">
      <div class="welcome-img">
        <img :src="welcome" />
      </div>
      <div class="username-text">
        請輸入您的暱稱（最長6個字）
        <div class="input-field">
          <q-input
            ref="nickName"
            bg-color="white"
            filled
            v-model="name"
            label="暱稱"
            :rules="[val => val && val.length < 7 || '請輸入暱稱，暱稱最多六個字']"
          ></q-input>
        </div>
        <div class="input-field">
          <q-btn color="black" label="進入遊戲" @click="enterGame()"></q-btn>
        </div>
      </div>
    </div>
    <div v-if="!notFillNickName">
      <div class="img-part">
        <img :src="time" />
      </div>
      <div class="context">
        {{ name }} 同學您好，
        <br>
        請靜待遊戲開始。
      </div>
    </div>
  </div>
</template>
<script>
import welcome from 'src/assets/images/welcome.png'
import time from 'src/assets/images/time.png'
import { db } from 'src/boot/serverConnection'
export default {
  props: ['nickName'],
  data () {
    return {
      id: this.$route.params.id,
      name: '',
      welcome,
      notFillNickName: true,
      time,
      avoidDoubleRequest: true
    }
  },
  created () {
    this.$bus.$on('changeView', (obj) => {
      this.notFillNickName = obj.bool
      this.name = obj.name
    })
  },
  beforeDestroy () {
    this.$bus.$off('changeView')
  },
  methods: {
    async enterGame () {
      this.$refs.nickName.validate()
      if (this.$refs.nickName.hasError) return
      if (!this.avoidDoubleRequest) return
      this.avoidDoubleRequest = false
      const newID = Math.floor(Math.random() * 1000000)
      let checkDuplicate = false
      await db.collection('player').where('playerName', '==', this.nickName).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          checkDuplicate = true
        })
      })
      if (checkDuplicate) {
        this.avoidDoubleRequest = true
        this.$q.notify({
          message: '此暱稱重複',
          type: 'warning'
        })
        return
      }
      db.collection('player').doc(String(newID)).set({
        playerName: this.name,
        score: 0,
        answerTime: 0,
        answer: [],
        questionIndex: -1
      })
        .then(() => {
          this.$emit('setNickName', this.name)
          localStorage.setItem('playerID', newID)
          this.notFillNickName = false
        })
        .catch(() => {
          this.$q.notify({
            message: '請再試一次',
            type: 'warning'
          })
        })
      this.avoidDoubleRequest = true
    }
  }

}
</script>
<style scoped>
.welcome-img {
  text-align: center;
  padding-top: 5vh;
}
.welcome-img > img {
  width: 60vw;
  max-height: 30vh;
}
.username-text {
  font-size: 1.2rem;
  text-align: center;
  padding-top: 10vh;
}
.input-field {
  margin: 5% 10%;
}

.img-part {
  text-align: center;
  padding-top: 20%;
}
.img-part > img {
  height: 20vh;
  /* margin: 20% 30%; */
}
.context {
  padding-top: 10%;
  text-align: center;
  font-size: 1.2rem;
}
</style>
