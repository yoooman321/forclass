import { db, storage } from 'src/boot/serverConnection'
import Store from '../store'

const getQuestionUrlFromFirebase = async (imgObject, type = 'questions') => {
  const { name } = imgObject
  const storageRef = storage.ref(`${type}/${name}`)
  await storageRef.put(imgObject)
  const url = await storageRef.getDownloadURL()
  return url
}

const addImageToFirebase = async questions => {
  for (let i = 0; i < questions.length; i++) {
    let question = {}
    if (questions[i].questionTitleImage) {
      question = questions[i]
      const url = await getQuestionUrlFromFirebase(question.questionTitleImage)
      question.imageUrl = url
    }
    const { options } = questions[i]
    await addAnswerImageToFirebase(options)
  }
}
const addAnswerImageToFirebase = async options => {
  for (let i = 0; i < options.length; i++) {
    if (options[i].file) {
      const option = options[i]
      const url = await getQuestionUrlFromFirebase(option.file, 'answers')
      option.imageUrl = url
    }
  }
}

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

export const getFinalQuestionList = async () => {
  const questions = Store.getters.questionList
  await addImageToFirebase(questions)
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
  return db.collection('questions').doc(String(examID)).delete()
    .then(() => true)
    .catch(() => false)
}
export function sendAnswer (playerID, answer, score, answerTime, questionIndex) {
  db.collection('player').doc(String(playerID)).update({
    answer,
    answerTime,
    score,
    questionIndex
  })
    .then(() => console.log('sucessful'))
}
export async function getPlayerInfo () {
  const playerInfo = []
  const player = db.collection('player')
  const res = await player.orderBy('score', 'desc').get()
  res.forEach(ele => {
    playerInfo.push(ele.data())
  })
  return playerInfo
}
export function alignRankList (playerInfo, id) {
  const rankList = playerInfo.reduce((acc, cur, index) => {
    const hasProperty = Object.prototype.hasOwnProperty.call(acc, cur.score)
    hasProperty ? acc[cur.score].push(cur.playerName) : acc[cur.score] = [cur.score, cur.playerName]
    return acc
  }, {})
  const numberArray = Object.keys(rankList)
  numberArray.sort((a, b) => (a > b) ? -1 : ((b > a) ? 1 : 0))
  const rank = numberArray.reduce((acc, cur, index) => {
    return { ...acc, [index + 1]: rankList[cur] }
  }, {})
  return db.collection('rankList').doc(String(id)).set(rank)
    .then(() => {
      return rank
    })
}
export function getRankList (examID) {
  return db.collection('rankList').doc(examID).get()
    .then(ele => {
      return ele.data()
    })
}
export function deleteRankList (examID) {
  db.collection('rankList').doc(String(examID)).delete()
    .then(() => {
      console.log('delete successfully!')
    })
}
