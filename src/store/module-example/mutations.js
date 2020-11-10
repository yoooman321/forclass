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
export function quesionTitleImageChange (state, [updateTitleImage, index]) {
  state.exam.questionList[index].questionTitleImage = updateTitleImage.name
  state.questionImageList.push(updateTitleImage)
  // console.log('exam: ', state.exam)
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
  console.log('aaaa: ', state.exam.questionList[index].options[0])
}
export function saveCurrentExam (state, data) {
  state.currentExam = data
}
export function deleteExam (state, index) {
  state.oldExamList = state.oldExamList.filter(ele => ele.examID !== index)
}
export function getExamList (state, data) {
  state.oldExamList.push(data)
}
export function saveCurrentQuesion (state) {
  state.currentQuestion = state.currentExam.questionList[state.questionIndex]
  state.questionIndex++
}
export function changeTimeOutFlag (state, flag) {
  state.timesOut = flag
}
export function changeTeacherPage (state, pageName) {
  state.teatcherPage = pageName
}
export function examIsFinished (state) {
  if (state.questionIndex < state.currentExam.questionList.length) return false
  return true
}
export function updateTitleImage (state, url) {
  state.questionTitleImage = url
}
