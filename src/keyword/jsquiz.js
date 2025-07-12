/**
 * 한국사 키워드 퀴즈 애플리케이션
 * @author Mr.Kim
 * @version 2.0.0
 */

(function () {
  'use strict';

  // 한국사 관련 문제들
  const questions = [{
    question: "고구려의 건국자는 누구인가요?",
    choices: ["주몽", "온조", "박혁거세", "김수로", "혁거세"],
    correctAnswer: 0,
    explanation: "고구려는 주몽(동명성왕)이 건국했습니다."
  }, {
    question: "백제의 건국자는 누구인가요?",
    choices: ["주몽", "온조", "박혁거세", "김수로", "혁거세"],
    correctAnswer: 1,
    explanation: "백제는 온조가 건국했습니다."
  }, {
    question: "신라의 건국자는 누구인가요?",
    choices: ["주몽", "온조", "박혁거세", "김수로", "혁거세"],
    correctAnswer: 2,
    explanation: "신라는 박혁거세가 건국했습니다."
  }, {
    question: "가야의 건국자는 누구인가요?",
    choices: ["주몽", "온조", "박혁거세", "김수로", "혁거세"],
    correctAnswer: 3,
    explanation: "가야는 김수로가 건국했습니다."
  }, {
    question: "고조선의 건국자는 누구인가요?",
    choices: ["주몽", "온조", "박혁거세", "김수로", "단군"],
    correctAnswer: 4,
    explanation: "고조선은 단군이 건국했습니다."
  }];

  /**
   * 퀴즈 애플리케이션 클래스
   */
  class QuizApp {
    constructor() {
      this.questionCounter = 0;
      this.selections = [];
      this.quiz = $('#quiz');
      this.isAnimating = false;

      this.init();
    }

    /**
     * 애플리케이션 초기화
     */
    init() {
      this.bindEvents();
      this.displayNext();
      this.updateProgress();
    }

    /**
     * 이벤트 바인딩
     */
    bindEvents() {
      // 다음 버튼 클릭 이벤트
      $('#next').on('click', (e) => {
        e.preventDefault();
        this.handleNext();
      });

      // 이전 버튼 클릭 이벤트
      $('#prev').on('click', (e) => {
        e.preventDefault();
        this.handlePrev();
      });

      // 시작 버튼 클릭 이벤트
      $('#start').on('click', (e) => {
        e.preventDefault();
        this.handleStart();
      });

      // 키보드 네비게이션
      $(document).on('keydown', (e) => {
        this.handleKeyboard(e);
      });

      // 접근성: 라디오 버튼 변경 이벤트
      $(document).on('change', 'input[name="answer"]', () => {
        this.updateProgress();
      });
    }

    /**
     * 키보드 네비게이션 처리
     */
    handleKeyboard(e) {
      switch (e.key) {
        case 'ArrowRight':
        case 'Enter':
          if (this.questionCounter < questions.length) {
            this.handleNext();
          }
          break;
        case 'ArrowLeft':
          if (this.questionCounter > 0) {
            this.handlePrev();
          }
          break;
        case 'Home':
          this.handleStart();
          break;
      }
    }

    /**
     * 다음 문제 처리
     */
    handleNext() {
      if (this.isAnimating) return;

      this.choose();

      if (isNaN(this.selections[this.questionCounter])) {
        this.showAlert('답을 선택해주세요!');
        return;
      }

      this.questionCounter++;
      this.displayNext();
    }

    /**
     * 이전 문제 처리
     */
    handlePrev() {
      if (this.isAnimating) return;

      this.choose();
      this.questionCounter--;
      this.displayNext();
    }

    /**
     * 퀴즈 재시작 처리
     */
    handleStart() {
      if (this.isAnimating) return;

      this.questionCounter = 0;
      this.selections = [];
      this.displayNext();
      $('#start').hide();
    }

    /**
     * 사용자 선택 저장
     */
    choose() {
      const selectedValue = $('input[name="answer"]:checked').val();
      this.selections[this.questionCounter] = selectedValue ? +selectedValue : NaN;
    }

    /**
     * 다음 문제 표시
     */
    displayNext() {
      this.isAnimating = true;

      this.quiz.fadeOut(() => {
        $('#question').remove();

        if (this.questionCounter < questions.length) {
          const nextQuestion = this.createQuestionElement(this.questionCounter);
          this.quiz.append(nextQuestion).fadeIn();

          // 이전 선택 복원
          if (!isNaN(this.selections[this.questionCounter])) {
            $(`input[value=${this.selections[this.questionCounter]}]`).prop('checked', true);
          }

          this.updateButtonVisibility();
          this.updateProgress();
        } else {
          const scoreElem = this.displayScore();
          this.quiz.append(scoreElem).fadeIn();
          $('#next, #prev').hide();
          $('#start').show();
          this.updateProgress(100);
        }

        this.isAnimating = false;
      });
    }

    /**
     * 문제 요소 생성
     */
    createQuestionElement(index) {
      const qElement = $('<div>', {
        id: 'question',
        'aria-label': `문제 ${index + 1}`
      });

      const header = $('<h2>', {
        text: `문제 ${index + 1}:`,
        'aria-label': `문제 ${index + 1}`
      });
      qElement.append(header);

      const question = $('<p>', {
        text: questions[index].question,
        'aria-label': questions[index].question
      });
      qElement.append(question);

      const radioButtons = this.createRadios(index);
      qElement.append(radioButtons);

      return qElement;
    }

    /**
     * 라디오 버튼 생성
     */
    createRadios(index) {
      const radioList = $('<ul>', {
        'aria-label': '답안 선택'
      });

      questions[index].choices.forEach((choice, i) => {
        const item = $('<li>');
        const input = $('<input>', {
          type: 'radio',
          name: 'answer',
          value: i,
          id: `answer-${i}`,
          'aria-label': choice
        });

        const label = $('<label>', {
          for: `answer-${i}`,
          text: choice
        });

        item.append(input, label);
        radioList.append(item);
      });

      return radioList;
    }

    /**
     * 점수 표시
     */
    displayScore() {
      const score = $('<div>', {
        id: 'question',
        'aria-label': '퀴즈 결과'
      });

      let numCorrect = 0;
      this.selections.forEach((selection, i) => {
        if (selection === questions[i].correctAnswer) {
          numCorrect++;
        }
      });

      const percentage = Math.round((numCorrect / questions.length) * 100);

      const resultText = `총 ${questions.length}문제 중 ${numCorrect}문제를 맞추셨습니다! (정답률: ${percentage}%)`;

      const resultHeader = $('<h2>', {
        text: '퀴즈 결과',
        'aria-label': '퀴즈 결과'
      });

      const resultParagraph = $('<p>', {
        text: resultText,
        'aria-label': resultText
      });

      score.append(resultHeader, resultParagraph);

      // 결과에 따른 메시지 추가
      let message = '';
      if (percentage >= 80) {
        message = '훌륭합니다! 한국사에 대한 이해도가 높으시네요!';
      } else if (percentage >= 60) {
        message = '좋습니다! 조금만 더 노력하면 완벽할 거예요!';
      } else {
        message = '괜찮습니다! 다시 한번 복습해보세요!';
      }

      const messageParagraph = $('<p>', {
        text: message,
        style: 'font-weight: bold; color: #667eea;'
      });

      score.append(messageParagraph);

      return score;
    }

    /**
     * 버튼 가시성 업데이트
     */
    updateButtonVisibility() {
      if (this.questionCounter === 1) {
        $('#prev').show();
      } else if (this.questionCounter === 0) {
        $('#prev').hide();
        $('#next').show();
      }
    }

    /**
     * 진행률 업데이트
     */
    updateProgress(percentage = null) {
      if (percentage === null) {
        percentage = Math.round(((this.questionCounter + 1) / questions.length) * 100);
      }

      $('#progress-fill').css('width', `${percentage}%`);
      $('#progress-text').text(`진행률: ${percentage}%`);
    }

    /**
     * 알림 표시
     */
    showAlert(message) {
      // 접근성을 위한 알림
      const alertDiv = $('<div>', {
        text: message,
        style: 'background: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; margin: 10px 0; text-align: center;',
        'aria-live': 'polite',
        'role': 'alert'
      });

      this.quiz.prepend(alertDiv);

      setTimeout(() => {
        alertDiv.fadeOut(() => alertDiv.remove());
      }, 3000);
    }
  }

  // DOM이 준비되면 퀴즈 시작
  $(document).ready(() => {
    try {
      new QuizApp();
    } catch (error) {
      console.error('퀴즈 애플리케이션 초기화 중 오류 발생:', error);
      $('#quiz').html('<p style="text-align: center; color: #dc3545;">퀴즈를 불러오는 중 오류가 발생했습니다. 페이지를 새로고침해주세요.</p>');
    }
  });

})();