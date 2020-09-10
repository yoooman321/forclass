<template>
  <div>
    <game-info :id="id"></game-info>
    <play-list></play-list>
    <!-- <q-btn label="test" @click="play"></q-btn> -->
  </div>
</template>
<script>
import GameInfo from '../../components/Lobby/GameInfo'
import PlayList from '../../components/Lobby/PlayList'
export default {
  components: {
    GameInfo,
    PlayList
  },
  props: ['id'],
  methods: {
    play () {
      this.$emit('playAudio')
      this.$bus.$emit('playBackgroundMusic')
      // this.$bus.$emit('playCountedSound')
    }
  }
}
</script>
