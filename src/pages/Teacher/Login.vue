<template>
  <div>
    {{ oldExamLists.examID }}
    <q-btn @click="test"></q-btn>
    <img :src="aaa" />
  </div>
</template>
<script>
import { storage } from 'src/boot/serverConnection'
export default {
  data () {
    return {
      aaa: ''
    }
  },
  created () {
    this.$store.dispatch('getExamList')
  },
  computed: {
    oldExamLists () {
      console.log('aaaa')
      return this.$store.state.oldExamList[0]
    }
  },
  methods: {
    test () {
      var forestRef = storage.ref('questions/ranking01.png')
      // Get metadata properties
      forestRef.getMetadata()
        .then(function (metadata) {
          this.aaa = metadata
          console.log('aaa: ', this.aaa)
        // Metadata now contains the metadata for 'images/forest.jpg'
        })
        .catch(function (error) {
          console.log('err: ', error)
          // Uh-oh, an error occurred!
        })
    }
  }
}
</script>
