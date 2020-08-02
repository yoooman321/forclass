<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          課堂使用
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="left"
      side="left"
      show-if-above
      bordered
      :width="150"
      content-class="bg-grey-3"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <drawer></drawer>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import Drawer from './Drawer'
export default {
  data () {
    return {
      left: false,
      miniState: true
    }
  },
  components: {
    Drawer
  }
}
</script>
<style scoped>
  .q-drawer {
    width: 5vw;
  }
</style>
