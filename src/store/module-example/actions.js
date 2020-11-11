import { db } from 'src/boot/serverConnection'
import { deleteExam, setWhichPage } from 'src/backend/index'
export async function deleteItem (context, index) {
  const deleteSuccess = await deleteExam(index)
  if (deleteSuccess) context.commit('deleteExam', index)
}
export function getExamList (context) {
  const exam = db.collection('questions')
  exam.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      context.commit('getExamList', {
        examID: doc.id,
        ...doc.data()
      })
      // data.push(
      //   {
      //     examID: doc.id,
      //     ...doc.data()
      //   }
      // )
      // console.log('aaaa: ', doc.id, doc.data())
    })
  })
  // context.commit('getExamList', data)
}
export function changeCurrentQuesiont (context) {
  const isFinished = context.commit('examIsFinished')
  console.log('ifi: ', isFinished)
  // if (isFinished)
  isFinished ? context.commit('saveCurrentQuesion') : context.commit('changeTeacherPage', 'game-finish')
}
export async function changePage (context, { examID, studentPage, teacherPage }) {
  console.log('ee: ', examID, studentPage, teacherPage)
  setWhichPage(examID, studentPage)
  context.commit('changeTeacherPage', teacherPage)
}
