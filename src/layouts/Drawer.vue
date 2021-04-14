<template>
  <div>
      <q-list v-for="(menuItem, index) in menuList" :key="index">
          <q-item clickable @click="goTo(menuItem.path)">
            <q-item-section avatar>
              <q-icon :name="menuItem.icon"></q-icon>
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
      </q-list>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      menuList: [
        {
          label: '新增問卷',
          icon: 'add_box',
          path: '/'
        },
        {
          label: '我的問卷',
          icon: 'folder',
          path: '/old'
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['resetVuexExam']),
    goTo (path) {
      this.resetVuexExam()
      this.$router.push(path)
    }
  }
}
</script>
<style scoped>
.link {
  color:black;
  text-decoration: none;
}
</style>
