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
      { number: 'A', bgColor: 'green' },
      { number: 'B', bgColor: 'yellow' },
      { number: 'C', bgColor: 'blue' },
      { number: 'D', bgColor: 'red' },
      { number: 'E', bgColor: 'white' },
      { number: 'F', bgColor: 'white' },
      { number: 'G', bgColor: 'white' },
      { number: 'H', bgColor: 'white' }
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
