import { db, storage } from 'src/boot/serverConnection'
import Store from '../store'
// import { Notify } from 'quasar'
export function addQuesionToFirebase (finalExam) {
  const newID = Math.floor(Math.random() * 1000000)
  return db.collection('questions').doc(String(newID)).set(finalExam)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}
export async function addQuestionImageToFirebase () {
  const questions = Store.getters.questionList
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].questionTitleImage) {
      const imageName = questions[i].questionTitleImage.name
      const storageRef = storage.ref('questions/' + imageName)
      await storageRef.put(questions[i].questionTitleImage)
      const url = await storageRef.getDownloadURL()
      questions[i].imageUrl = url
    }
  }
  return addAnswerImageToFirebase(questions)
}
export async function addAnswerImageToFirebase (questions) {
  for (let i = 0; i < questions.length; i++) {
    for (let j = 0; j < questions[i].options.length; j++) {
      if (questions[i].options[j].type === '圖片') {
        const imageName = questions[i].options[j].file.name
        const storageRef = storage.ref('answers/' + imageName)
        await storageRef.put(questions[i].options[j].file)
        const url = await storageRef.getDownloadURL()
        questions[i].options[j].imageUrl = url
      }
    }
  }
  return questions
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
  db.collection('currentQuestion').doc(String(examID)).set(question)
    .catch(err => {
      console.error('err: ', err)
    })
}
export function updateCurrentQuestion (examID, question) {
  db.collection('currentQuestion').doc(String(examID)).update(question)
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
export function deletePlayer () {
  db.collection('player').delete()
    .then(() => console.log('dleeee'))
    .catch(err => console.log('err: ', err))
}
export function deleteQuestion (examID) {
  db.collection('currentQuestion').doc(String(examID)).delete()
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
export function sendAnswer (playerID, answer, score, answerTime) {
  db.collection('player').doc(String(playerID)).update({
    answer,
    answerTime,
    score
  })
    .then(() => console.log('sucessful'))
}
export async function getPlayerInfo () {
  const playerInfo = []
  const player = db.collection('player')
  const res = await player.orderBy('answerTime', 'asc').get()
  res.forEach(ele => {
    playerInfo.push(ele.data())
  })
  return playerInfo
}
