import { db, storage } from 'src/boot/serverConnection'
import Store from '../store'
import { Notify } from 'quasar'
export function addQuesionToFirebase () {
  const newID = Math.floor(Math.random() * 1000000)
  const question = Store.getters.exam
  return db.collection('questions').doc(String(newID)).set(question)
    .then(() => {
      return true
      // addQuestionImageToFirebase()
    })
    .catch(err => {
      console.log('err: ', err)
      return false
    })
}
export function addQuestionImageToFirebase () {
  const questionImageList = Store.getters.questionImageList
  questionImageList.forEach(ele => {
    storage.ref('questions/' + ele.name).put(ele)
  })
  Notify.create({
    message: '新增成功',
    color: 'positive'
  })
}
export function addAnswerImageToFirebase () {
  const qanswerImageList = Store.getters.answerImageList
  qanswerImageList.forEach(ele => {
    storage.ref('answers/' + ele.name).put(ele)
  })
}
export function addCurrentExamData (examID, examData) {
  db.collection('currentExam').doc(examID).set(examData)
    .then(() => {
      console.log('done')
    })
    .catch(err => {
      console.log('err: ', err)
    })
}
export function setWhichPage (examID, pageName) {
  db.collection('whichPage').doc(examID).set({ page: pageName })
    .then(() => console.log('done'))
}
export function getCurrentExamData (examID) {
  return db.collection('currentExam').doc(examID).get()
    .then(ele => {
      return ele.data()
    })
}
export function setCurrentQuestion (examID, question) {
  db.collection('currentQuesion').doc(String(examID)).set(question)
    .catch(err => {
      console.error('err: ', err)
    })
}
export function updateCurrentQuestion (examID, question) {
  db.collection('currentQuesion').doc(String(examID)).update(question)
    .then(res => {
      // console.log('res: ', res)
    })
    .catch(err => {
      console.log('err: ', err)
    })
}
export function getImageName (titleImage, answerImage) {
  let titleImageUrl = ''
  const answerImageUrl = []
  if (titleImage) {
    titleImageUrl = getImageUrl('questions', titleImage)
  }
  if (answerImage) {
    answerImage.forEach(ele => {
      answerImageUrl.push(getImageUrl('answers', ele))
    })
  }
  return { titleImageUrl, answerImageUrl }
}
export function getImageUrl (path, fileName) {
  console.log('path: ', path)
  console.log('fileNmae: ', fileName)
  const storageRef = storage.ref(path + '/' + fileName)
  return storageRef.getDownloadURL()
    .then(res => {
      return res
    })
    .catch(err => {
      console.log('err', err)
    })
}
export function deleteCurrentExam (examID) {
  db.collection('currentExam').doc(String(examID)).delete()
    .then(() => {
      console.log('delete successfully!')
    })
}
export function deleteQuestion (examID) {
  db.collection('currentQuesion').doc(String(examID)).delete()
    .then(() => {
      console.log('delete successfully!')
    })
}
export function deleteExam (examID) {
  db.collection('questions').doc(String(examID)).delete()
    .then(() => {
      return true
    })
    .catch(err => console.log('err: ', err))
}
