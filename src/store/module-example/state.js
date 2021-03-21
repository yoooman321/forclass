export default function () {
  return {
    exam: {
      examName: '',
      questionList: [
        {
          questionTitle: '',
          questionTitleImage: null,
          settings: {
            limitedTime: 20
          },
          answerType: '單選',
          expanded: true,
          options: []
        }
      ]
    },
    optionListSetting: [
      { number: 'A', bgColor: '#4D9DE0' },
      { number: 'B', bgColor: '#E15554' },
      { number: 'C', bgColor: '#E1BC29' },
      { number: 'D', bgColor: '#3BB273' },
      { number: 'E', bgColor: '#7768AE' },
      { number: 'F', bgColor: '#191919' },
      { number: 'G', bgColor: '#0B3948' },
      { number: 'H', bgColor: '#251605' }
    ],
    oldExamList: [],
    currentExam: [],
    currentQuestion: {},
    timesOut: false,
    teatcherPage: 'lobby',
    questionIndex: 0,
    studentQuestionIndex: 0,
    showStatic: false,
    playerAnswerList: []
  }
}
