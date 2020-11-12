<template>
<div class="main" v-if="!finished">
  <!-- <audio id="video" :src="music" muted></audio> -->
  <!-- <template v-if="!finished"> -->
  <template>
    <div class="time" :style="gradient">
      {{display}}
    </div>
  </template>
</div>
</template>
<script>
import { DateTime, Duration } from 'luxon'
export default {
  props: ['time'],
  data () {
    return {
      start: DateTime.local(),
      now: DateTime.local(),
      end: DateTime.local().plus({ seconds: this.time }),
      tick: null,
      counted: false
    }
  },
  watch: {
    now () {
      if (this.finished) {
        clearInterval(this.tick)
        this.$store.dispatch('changeTimeOutFlag', true)
      }
    }
  },
  computed: {
    total () {
      return this.end.diff(this.start).toObject()
    },
    remaining () {
      return this.end.diff(this.now).toObject()
    },
    elapsed () {
      return this.now.diff(this.start).toObject()
    },
    percent () {
      return this.elapsed.milliseconds / this.total.milliseconds * 100
    },
    display () {
      return Duration.fromObject(this.remaining).toFormat('ss')
    },
    finished () {
      return this.now >= this.end
    },
    gradient () {
      if (this.display > 5) {
        return {
          background: `radial-gradient(#190B28 50%, transparent 51%), conic-gradient(#41D3BD 0% ${this.percent}%, transparent ${this.percent}% 100%)`
        }
      } else {
        return {
          background: `radial-gradient(#424B54 50%, transparent 51%), conic-gradient(#D33F49 0% ${this.percent}%, transparent ${this.percent}% 100%)`
        }
      }
    }
  },
  mounted () {
    // this.$store.dispatch('changeTimeOutFlag', false)
    this.tick = setInterval(() => {
      this.now = DateTime.local()
    }, 10)
  }
}
</script>
<style scoped>
.main {
  align-items: center;
  display: flex;
  justify-content: center;
}
.time {
  border-radius: 50%;
  height: 20vh;
  width: 20vh;
  text-align: center;
  font-size: 38px;
  line-height: 20vh;
  color: #FEEFE5;
  font-weight: bold;
}
</style>
