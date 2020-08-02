<template>
  <div>
      <q-list v-for="(menuItem, index) in menuList" :key="index">
        <router-link class="link" :to="menuItem.path">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon :name="menuItem.icon"></q-icon>
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
        </router-link>
      </q-list>
  </div>
</template>
<script>
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
  }
}
</script>
<style scoped>
.link {
  color:black;
  text-decoration: none;
}
</style>
