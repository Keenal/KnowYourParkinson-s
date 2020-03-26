(function() {
    var questions = [{
      question: "Tremor - Involuntary movement at rest.",
      choices: ["Never", "Rarely", "Occasionally", "Sometimes", "Frequently", "Always"],
      correctAnswer: "Never"
    }, {
      question: "Rigidity - Tightness or stiffness of the limbs or torso.",
      choices: ["Never", "Rarely", "Occasionally", "Sometimes", "Frequently", "Always"],
      correctAnswer: "Never"
    }, {
      question: "Balance/Walking Difficulties - Taking small or slow steps; a shuffling giat; decrease in the natural swing of the arms.",
      choices: ["Never", "Rarely", "Occasionally", "Sometimes", "Frequently", "Always"],
      correctAnswer: "Never"
    }
  ];
    /*
    {
      question: "Motor Fluctuations/Dyskinesia - On and off periods of controlled motor symptoms; sudden, uncontrollabele, movements.",
      choices: ["Never", "Rarely", "Occasionally", "Sometimes", "Frequently", "Always"],
      correctAnswer: "Never"
    }, {
      question: "Fatigue/Sleep Disturbances - Difficulty falling asleep or staying asleep; vivd dreams; daytime sleepiness.",
      choices: ["Never", "Rarely", "Occasionally", "Sometimes", "Frequently", "Always"],
      correctAnswer: "Never"
    }, {
        question: "Anxiety/Depression/Memory - Feeling nervous or irritable; feelign sad, empty and hopeless",
        choices: ["Never", "Rarely", "Occasionally", "Sometimes", "Frequently", "Always"],
        correctAnswer: "Never"
    }, {
        question: "Swallowing - Difficulty swallowing; drolling; excessive saliva in the mouth.",
        choices: ["Never", "Rarely", "Occasionally", "Sometimes", "Frequently", "Always"],
        correctAnswer: "Never"
    }, {
        question: "Gastrointestinal Issues/Constipation - Nausea; vomiting; diarrhea; infrequent bowel movements.",
        choices: ["Never", "Rarely", "Occasionally", "Sometimes", "Frequently", "Always"],
        correctAnswer: "Never"
    }, {
        question: "Sexual Concerns - Changes in sexual desire; erectile dysfunction.",
        choices: ["Never", "Rarely", "Occasionally", "Sometimes", "Frequently", "Always"],
        correctAnswer: "Never"
    }, {
        question: "Hallucinations - Seeing, hearing or sensing things that are not there.",
        choices: ["Never", "Rarely", "Occasionally", "Sometimes", "Frequently", "Always"],
        correctAnswer: "Never"
    }, {
        question: "Delusions - Believing things that are not true.",
        choices: ["Never", "Rarely", "Occasionally", "Sometimes", "Frequently", "Always"],
        correctAnswer: "Never"
    }
    */

    
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
    
    // Display initial question
    displayNext();
    
    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h3>Question ' + (index + 1) + ':</h3>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }


    
    // Displays next requested element
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // Controls display of 'prev' button
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
     /* var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
    */

   var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      alert(selections[0]);
      switch(selections[i]){
        case 0:
          numCorrect = numCorrect + 5;
          break;
        case 1:
          numCorrect = numCorrect + 4;
          break;
        case 2:
          numCorrect = numCorrect + 3;
          break;
        case 3:
          numCorrect = numCorrect + 2;
          break;
        case 4:
          numCorrect = numCorrect + 1;
          break;
        case 5:
          numCorrect = numCorrect + 0;
          break;
        default:
          break;
      }
    }
    
      score.append('You got ' + numCorrect + ' questions out of ' +
                   questions.length + ' right!!!');

      return numCorrect;
    }


  })();