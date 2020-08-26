export default function () {
  return {
    exam: {
      examName: '',
      questionList: [
        {
          questionTitle: '',
          questionTitleImage: '',
          settings: {
            limitedTime: 20
          },
          answerType: '單選',
          expanded: true,
          options: []
        }
      ]
    },
    oldExamList: [
      {
        examID: 1,
        examName: '護理觀念導引',
        questionList: [
          {
            questionTitle: 'abc',
            questionTitleImage: '',
            settings: {
              limitedTime: 20
            },
            answerType: '單選',
            answer: '',
            expanded: true
          }
        ]
      },
      {
        examID: 2,
        examName: '如何成為護理師',
        questionList: [
          {
            questionTitle: '',
            questionTitleImage: '',
            settings: {
              limitedTime: 20
            },
            answerType: '單選',
            answer: '',
            expanded: true
          }
        ]
      }
    ]
  }
}
