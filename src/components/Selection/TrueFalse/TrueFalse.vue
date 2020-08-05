<template>
  <div class="true-false">
    <q-item
      clickable
      v-ripple
      :active="selected === true"
      @click="onClick(true)"
      active-class="active"
    >
      <q-item-section side>
        <q-icon name="radio_button_unchecked"></q-icon>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :active="selected === false"
      @click="onClick(false)"
      active-class="active"
    >
      <q-item-section side>
        <q-icon name="close"></q-icon>
      </q-item-section>
    </q-item>
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      selected: ''
    }
  },
  methods: {
    onClick (val) {
      this.selected = val
      this.$emit('setCorrectOption', val)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './trueFalse.styl';
</style>
