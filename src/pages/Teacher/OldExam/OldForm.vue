<template>
  <div class="oldForm">
    <old-exam></old-exam>
  </div>
</template>
<script>
import OldExam from 'src/components/Teacher/OldExam/OldExam'
export default {
  name: 'OldForm',
  components: {
    OldExam
  }
}
</script>
<style lang="stylus" scoped>
.oldForm
  margin 5vh
  .title
    font-size 20px
    color $primary
    font-weight bold
    margin 1vh 0
</style>
