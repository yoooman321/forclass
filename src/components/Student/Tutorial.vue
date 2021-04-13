<template>
  <div class="tutorial">
    <div class="answer-part">
      <div class="answer-block" :style="{backgroundColor: '#4D9DE0'}"></div>
      <div class="answer-block" :style="{backgroundColor: '#E15554', border: '3px outset #805B0C', opacity: '0.3'}">
        <q-icon class="material-icons text-black done" style="font-size: 5rem;">
          done
        </q-icon>
      </div>
      <div class="answer-block" :style="{backgroundColor: '#E1BC29'}"></div>
      <div class="answer-block" :style="{backgroundColor: '#3BB273'}"></div>
    </div>
    <div class="tip">點擊正確答案後，點擊右上角答案確定送出答案</div>
    <q-btn class="nextBtn" label="我知道了" style="background: #342E37" size="lg" @click="next"></q-btn>
    <q-btn label="答案確定" color="secondary" class="confirm-btn"></q-btn>
  </div>
</template>
<script>
export default {
  methods: {
    next () {
      this.$parent.tutorialFlag = false
      this.$store.commit('changestudentHeaderTitle', '開始遊戲')
    }
  }
}
</script>
<style scoped>
.tutorial {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.6) !important;
  color: white;
  z-index: 3000;
  position: fixed;
}
.answer-part {
  /* padding-top: 51px; */
  height: calc(100vh - 100px);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.answer-block {
  height: 50%;
  width: 50%;
  text-align: center;
}
.tip {
  color: #000;
  font-size: 2rem;
  position: absolute;
  top: 30vh;
  left: 10vw;
  width: 80vw;
  text-align: center;
  background: #fff;
  border-radius: 5px;
}
.nextBtn{
  position: absolute;
  bottom: 20vh;
  right: 0;
  left: 0;
  margin: auto;
}
.confirm-btn {
  position: absolute;
  right: 5px;
  top: -45px;
}
</style>
