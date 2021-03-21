import { db } from 'src/boot/serverConnection'
import { deleteExam, setWhichPage } from 'src/backend/index'
import { Notify } from 'quasar'
export async function deleteItem (context, index) {
  const deleteSuccess = await deleteExam(index)
  if (deleteSuccess) {
    context.commit('deleteExam', index)
    Notify.create({
      message: '刪除成功',
      type: 'positive',
      timeout: 1000
    })
    return
  }
  Notify.create({
    message: '刪除失敗',
    type: 'negative',
    icon: 'warning',
    timeout: 1000
  })
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
