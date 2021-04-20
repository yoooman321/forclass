export function addQuestion (state) {
  state.exam.questionList.push({
    questionTitle: '',
    questionTitleImage: null,
    settings: {
      limitedTime: 20
    },
    answerType: '單選',
    options: [{ value: '', isAnswer: false, type: '文字', file: null },
      { value: '', isAnswer: false, type: '文字', file: null },
      { value: '', isAnswer: false, type: '文字', file: null },
      { value: '', isAnswer: false, type: '文字', file: null }]
  })
}
export function setQuesiontList (state, [value, index, objectName]) {
  switch (objectName) {
    case 'questionTitle':
      state.exam.questionList[index].questionTitle = value
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
export function quesionTitleImageChange (state, [updateTitleImage, index]) {
  state.exam.questionList[index].questionTitleImage = updateTitleImage.name
  state.questionImageList.push(updateTitleImage)
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
  state.exam.rankDisabledFlag = false
  addQuestion(state)
}
export function getExamList (state, data) {
  const findDuplicate = state.oldExamList.find((item) => {
    return item.examID === data.examID
  })
  if (findDuplicate) return
  state.oldExamList.push(data)
}
export function savecurrentQuestion (state) {
  state.currentQuestion = state.currentExam.questionList[state.questionIndex]
  state.questionIndex++
}
export function changeTimeOutFlag (state, flag) {
  state.timesOut = flag
  window.setTimeout(() => {
    changeStaticFlag(state, flag)
  }, 2000)
}
export function changeStaticFlag (state, flag) {
  state.showStatic = flag
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
export function updatePlayerAnswerList (state, playerName) {
  state.playerAnswerList.push(playerName)
}
export function cleanPlayerAnswerList (state) {
  state.playerAnswerList = []
}
export function addStudentQuestionIndex (state) {
  state.studentQuestionIndex++
}
export function changestudentHeaderTitle (state, titleName) {
  state.studentHeaderTitle = titleName
}
export function editQuestion (state, exam) {
  state.exam = exam
}
export function changeSelectionType (state, [questionIndex, selectionIndex, value]) {
  state.exam.questionList[questionIndex].options[selectionIndex].type = value
}
export function changeOptioniSingleAnswer (state, [questionIndex, selectionIndex, value]) {
  state.exam.questionList[questionIndex].options.forEach((ele, i) => {
    i === selectionIndex ? ele.isAnswer = value : ele.isAnswer = false
  })
}
export function changeOptionFile (state, [questionIndex, selectionIndex, value]) {
  state.exam.questionList[questionIndex].options[selectionIndex].file = value
}
export function changeOptionValue (state, [questionIndex, selectionIndex, value]) {
  state.exam.questionList[questionIndex].options[selectionIndex].value = value
}
export function addOption (state, [questionIndex, newOption]) {
  state.exam.questionList[questionIndex].options.push(newOption)
}
export function deleteOption (state, [questionIndex, selectionIndex]) {
  state.exam.questionList[questionIndex].options.splice(selectionIndex, 1)
}
export function changeOptionMultiAnswer (state, [questionIndex, selectionIndex, value]) {
  state.exam.questionList[questionIndex].options[selectionIndex].isAnswer = value
}
export function resetVuexExam (state) {
  state.exam = {
    examName: '',
    rankDisabledFlag: false,
    questionList: [
      {
        questionTitle: '',
        questionTitleImage: null,
        settings: {
          limitedTime: 20
        },
        answerType: '單選',
        expanded: true,
        options: [{ value: '', isAnswer: false, type: '文字', file: null },
          { value: '', isAnswer: false, type: '文字', file: null },
          { value: '', isAnswer: false, type: '文字', file: null },
          { value: '', isAnswer: false, type: '文字', file: null }]
      }
    ]
  }
}
export function deleteQuestion (state, [index]) {
  state.exam.questionList.splice(index, 1)
}
export function changeRankDisabled (state, value) {
  state.exam.rankDisabledFlag = value
}
