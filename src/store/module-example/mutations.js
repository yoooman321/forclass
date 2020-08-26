export function addQuestion (state) {
  state.exam.questionList.push({
    questionTitle: '',
    questionTitleImage: '',
    settings: {
      limitedTime: 20
    },
    answerType: '單選',
    expanded: true,
    options: []
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
  state.exam.questionList[index].settings.limitedTime = limitedTime
}
export function changeExamName (state, examName) {
  state.exam.examName = examName
}
export function changeOptions (state, [options, index]) {
  state.exam.questionList[index].options = options
}
