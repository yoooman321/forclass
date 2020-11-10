<template>
  <div>
    <q-table
      title="我的考題"
      :data="oldExamLists"
      :columns="columns"
      row-key="examID"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"></q-icon>
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="examID" :props="props">
            {{ props.row.examID }}
          </q-td>
          <q-td key="examName" :props="props">
            {{ props.row.examName }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn color="primary" label="編輯" @click="editItem(props.row)" size=sm style="margin: 1vh;"></q-btn>
             <q-btn color="secondary" label="開始玩"  @click="playIt(props.row)" size=sm style="margin: 1vh;"></q-btn>
            <q-btn color="negative" label="刪除"  @click="showDeleteDialog(props.row)" size=sm style="margin: 1vh;"></q-btn>
          </q-td>
        </q-tr>
        <q-dialog v-model="deleteDialog">
          <q-card>
            <span class="q-ml-sm">You are currently not connected to any network.</span>
          </q-card>
        </q-dialog>
      </template>
    </q-table>
  </div>
</template>
<script>
import { addCurrentExamData } from 'src/backend/index'
export default {
  data () {
    return {
      deleteDialog: false,
      columns: [{
        name: 'examID',
        required: true,
        field: row => row.examID,
        format: val => `${val}`,
        label: '試題ＩＤ',
        align: 'center'
      },
      {
        name: 'examName',
        align: 'center',
        label: '試題標題',
        field: 'examName'
      },
      {
        name: 'actions',
        label: '操作',
        field: 'actions',
        align: 'center'
      }],
      filter: '',
      getOldExamList: []
    }
  },
  computed: {
    oldExamLists () {
      return this.$store.state.oldExamList
    }
  },
  created () {
    this.$store.dispatch('getExamList')
  },
  methods: {
    // ...mapMutations(['saveCurrentExam']),
    playIt (data) {
      // 1. store id into local storage (in case pressing refresh accidentally)
      // 2. put data in vuex (current exam)
      // this.saveCurrentExam(data)
      addCurrentExamData(data.examID, data)
      const routeData = this.$router.resolve({ name: 'Start', params: { id: data.examID, examData: data } })
      window.open(routeData.href, '_blank')
    },
    deleteItem (data) {
      // delete
      // console.log(data)
      this.$store.dispatch('deleteItem', data.examID)
    },
    showDeleteDialog () {
      this.deleteDialog = true
    }
  }
}
</script>
<style lang="stylus" scoped>
.q-btn
  margin 1vh
</style>
