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
    questionImageList: [],
    answerImageList: [],
    oldExamList: [],
    currentExam: [],
    currentQuestion: {},
    timesOut: false,
    teatcherPage: 'lobby',
    questionIndex: 0,
    questionTitleImage: ''
  }
}
