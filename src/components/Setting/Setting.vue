<template>
  <div class="setting-part">
    <div class="title">答題設定：</div>
    <q-input outlined v-model="limitedTime" label="答題秒數" suffix="秒" type="number" @blur="changeLimitedTime"></q-input>
  </div>
</template>
<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      limitedTime: 20
    }
  },
  methods: {
    changeLimitedTime () {
      this.$emit('changeLimitedTime', this.limitedTime, this.index)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './setting.styl';
</style>
