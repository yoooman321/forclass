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
    })
  })
}
export function changecurrentQuestiont (context) {
  const isFinished = context.commit('examIsFinished')
  isFinished ? context.commit('savecurrentQuestion') : context.commit('changeTeacherPage', 'game-finish')
}
export async function changePage (context, { examID, studentPage, teacherPage }) {
  setWhichPage(examID, studentPage)
  context.commit('changeTeacherPage', teacherPage)
}
export function changeTimeOutFlag (context, flag) {
  context.commit('changeTimeOutFlag', flag)
  window.setTimeout(() => {
    context.commit('changeStaticFlag', flag)
  }, 1000)
}
