export function addQuestion (state) {
  state.exam.questionList.push({
    questionTitle: '',
    questionTitleImage: null,
    settings: {
      limitedTime: 20
    },
    answerType: '單選',
    expanded: true,
    options: []
  })
}
export function setQuesiontList (state, [value, index, objectName]) {
  switch (objectName) {
    case 'questionTitle':
      state.exam.questionList[index].answerType = value
      break
    case 'questionTitleImage':
      state.exam.questionList[index].questionTitleImage = value
      break
    case 'answerType':
      state.exam.questionList[index].answerType = value
      break
    case 'limitedTime':
      state.exam.questionList[index].settings.limitedTime = value
      break
    default:
      break
  }
}
export function changeExpnaded (state, index) {
  state.exam.questionList[index].expanded = !state.exam.questionList[index].expanded
}
export function changeExamName (state, examName) {
  state.exam.examName = examName
}
export function changeOptions (state, [options, index]) {
  state.exam.questionList[index].options = options
}
export function saveCurrentExam (state, data) {
  state.currentExam = data
}
export function deleteExam (state, index) {
  state.oldExamList = state.oldExamList.filter(ele => ele.examID !== index)
}
export function resetQuestion (state) {
  state.exam.examName = ''
  state.exam.questionList = []
  addQuestion(state)
}
