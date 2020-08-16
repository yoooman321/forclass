export function addQuestion (state) {
  state.exam.questionList.push({
    questionTitle: '',
    questionTitleImage: '',
    settings: {
      limitedTime: 20
    },
    answerType: '單選',
    answer: '',
    expanded: true
  })
}
export function questionTitleChange (state, [updateTitle, index]) {
  state.exam.questionList[index].questionTitle = updateTitle
}
export function changeExpnaded (state, index) {
  state.exam.questionList[index].expanded = !state.exam.questionList[index].expanded
}
export function changeAnswerType (state, [answerType, index]) {
  state.exam.questionList[index].answerType = answerType
}
export function changeLimitedTime (state, [limitedTime, index]) {
  state.exam.questionList[index].limitedTime = limitedTime
}
export function changeExamName (state, examName) {
  state.exam.examName = examName
}
export function changeAnswer (state, [answer, index]) {
  state.exam.questionList[index].answer = answer
}
export function saveCurrentExam (state, data) {
  state.currentExam = data
  // console.log('state: ', state.currentExam)
}
export function deleteExam (state, index) {
  state.oldExamList = state.oldExamList.filter(ele => ele.examID !== index)
}
