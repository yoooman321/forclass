import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import Vue from 'vue'
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export const firebaseConfig = {
  apiKey: 'AIzaSyCmv9PaLdMZhZ6IcnQY34cfRABHjPDJ6-s',
  authDomain: 'for-class-ae5df.firebaseapp.com',
  databaseURL: 'https://for-class-ae5df.firebaseio.com',
  projectId: 'for-class-ae5df',
  storageBucket: 'for-class-ae5df.appspot.com',
  messagingSenderId: '684353887356',
  appId: '1:684353887356:web:ca6888fe468d90cae1bdf9',
  measurementId: 'G-BSS69PKPG1'
}
const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()
export const auth = firebaseApp.auth()
export const storage = firebaseApp.storage()
Vue.prototype.$fb = firebaseApp
