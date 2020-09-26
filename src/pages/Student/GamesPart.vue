<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-black text-white" >
      <q-toolbar>
        <q-toolbar-title>
          <div style="text-align: center; font-weight: bold">Question 1 / 10</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
        <component :is="whichPage"></component>
    </q-page-container>

    <q-footer bordered class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>
          <div class="footer">
            <div style="padding: 0 3vw; font-weight: bold;">Your Name </div>
            <div style="padding: 0 3vw; font-weight: bold; background-color: pink; border-radius: 1vh;">your score</div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
import AnswerSelection from 'src/components/Student/AnswerSelection'
import ShowAnswer from 'src/components/Student/ShowAnswer'
import AmongQuestion from 'src/components/Student/AmongQuestion'
import Result from 'src/components/Student/Result'
export default {
  data () {
    return {
      whichPage: 'result'
    }
  },
  components: {
    AnswerSelection,
    ShowAnswer,
    AmongQuestion,
    Result
  }
}
</script>
<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
}
</style>
