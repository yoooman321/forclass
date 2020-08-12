<template>
  <div class="setting-part">
    <div class="title">答題設定：</div>
    <q-input
      outlined
      v-model="limitedTime"
      label="答題秒數"
      suffix="秒"
      type="number"
      @blur="changeLimitedTime([limitedTime, index])"
    ></q-input>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
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
    ...mapMutations(['changeLimitedTime'])
  }
}
</script>
<style lang="stylus" scoped>
@import './setting.styl';
</style>
