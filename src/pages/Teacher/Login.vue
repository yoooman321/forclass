<template>
  <div class="login-page">
    <q-card class="login-card">
      <q-card-section>
        <div class="login-title">老師登入</div>
      </q-card-section>
      <q-card-section class="input-field">
        <q-input class="input" bg-color="grey-1" outlined v-model="email" label="Email:"></q-input>
        <q-input class="input" :type="isPwd ? 'password' : 'text'" bg-color="grey-1" outlined v-model="password" label="密碼:">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            ></q-icon>
          </template>
        </q-input>
        <q-btn @click="login" size="lg" class="login-button" label="登入" color="primary"></q-btn>
      </q-card-section>
    </q-card>
    <div class="student-hint">
      <router-link :to="{name: 'Room'}">學生請點此</router-link>
    </div>
  </div>
</template>
<script>
import { auth } from 'src/boot/serverConnection'
export default {
  data () {
    return {
      aaa: '',
      email: '',
      password: '',
      isPwd: true
    }
  },
  created () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/')
      }
    })
  },
  methods: {
    async login () {
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          this.$q.notify({
            message: err.message,
            type: 'negative',
            icon: 'warning',
            position: 'top-right',
            timeout: 1000
          })
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.login-page
  background linear-gradient(45deg, #80C2AF, #30C5FF)
  height 100vh
  padding-top 15vh
  .login-card
    width 50vw
    margin auto
    padding-bottom 3vh
    background rgba(255,255,255,0.8)
    border 0.5px solid gray
    box-shadow 5px 5px 20px #242325
    .login-title
      text-align center
      font-size 1.5rem
      font-weight bold
    .input-field
      margin 0 5vw
      .input
        margin-bottom 5vh
  .student-hint
    padding-top 1vh
    color #1E000E
    font-size 1rem
    text-align center
</style>
