<template>
    <div class="title" :class="titleSize">
      {{title}}
    </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  data () {
    return {
      titleSize: ''
    }
  },
  created () {
    switch (true) {
      case this.title.length > 250:
        this.titleSize = 'title-large'
        break
      case this.title.length > 150:
        this.titleSize = 'title-medium'
        break
      default:
        this.titleSize = 'title-small'
        break
    }
  }
}
</script>
<style lang="stylus" scoped>
.title
  font-weight: bold;
  padding-top: 1vh;
  text-align: center;

.title-large {
  font-size: 2em;
}
.title-medium {
  font-size: 2.5em;
}
.title-small {
  font-size: 3em;
}
</style>
