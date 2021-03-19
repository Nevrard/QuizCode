var homeEl = document.querySelector("#home")
var start= document.querySelector("#start")
var questionEl= document.querySelector("#question")
var liEl = document.querySelector("#list")
var ilEl = document.querySelectorAll("li")
var pEl = document.querySelector("#p")
var overEl=document.querySelector("#over")
var timerEl=document.querySelector("#timer")
var scoreEl = document.querySelector("#score")
var initialEl = document.querySelector("#initials")
var submitEl = document.querySelector("#submit")
var titleEl= document.querySelector("#oh2")
var clearEl=document.querySelector("#clear")
var backEl=document.querySelector("#back")
var labelEl=document.querySelector("#lab")
var listScoreEl=document.querySelector("#listScore")
var viewEl=document.querySelector("#view")
var finalScore;
var timerCount;
var position=0;

 //Array thet holds the Questions defined as objects
 var questions =[
      {
                quest:"Arrays in Javascript are used to store_____",
                options:["Numbers and strings","others arrays","Booleans"],
                correct:"Numbers and strings" ,
       },

      {
                    quest:"Which type of javascript language is _____",
                options:["Object-oriented","Object-based","Assembly-language"],
                correct:"Object-oriented" ,
      },

      {
                    quest:"The 'function' and 'var'are known as_____",
                options:["Keywords","Data types","Declaration statements"],
                correct:"Declaration statements" ,
      },

      {
                quest:" Which of the following type of variable takes precedence over other if names are same?_____",
            options:["Global Variable","Local Variable","None of the above"],
            correct:"Local Variable" ,
      },

      {
              quest:" Which built-in method returns the characters in a string beginning at the specified location?_____",
          options:["substr()","getSubstring()","slice()"],
          correct:"substr()" ,
      },

     {
            quest:"Which of the following function of Array object adds and/or removes elements from an array?_______",
            options:["toSource()","sort()","splice()"],
             correct:"splice()" ,
    } ,

    {
      quest:"Which of the following number object function returns the value of the number?",
      options:["toFixed()","toExponential()","toPrecision()"],
      correct:"toPrecision()" ,
    },
    {
      quest:"Choose the correct snippet from the following to check if the variable 'a' is not equal the 'NULL':",
      options:["if(a!==null)","if (a!)","if(a!=null)"],
      correct:"if(a!==null)" ,
    },
    {
      quest:"Which one of the following operator is used to check weather a specific property exists or not:",
      options:["Exists","exist","in"],
      correct:"in" ,
    },
    {
      quest:"______In the JavaScript, which one of the following is not considered as an error:",
      options:["Syntax error","Missing of semicolons","Missing of Bracket"],
      correct:"Missing of semicolons" ,
    },
    {
      quest:"_____ tag is an extension to HTML that can enclose any number of JavaScript statements.",
      options:["<SCRIPT>","<BODY>","<HEAD>"],
      correct:"<SCRIPT>" ,
    }
       ]   
   //Functions that initialize the variables when before the Quiz start
       init();  
     function codeQuiz()
    {
       finalScore=0;
        timerCount=100;
        position=0;
      //  isfinish=false;
        
        displayQuestion();
        startTimer();
                             
      }
  //Event listener to start the Quiz
start.addEventListener("click",codeQuiz) 

  //Function that displays Questions and multiple choices to the User
   function displayQuestion ()

    { 

        var i = questions[position]
        homeEl.style.display="none";
         liEl.style.display="block";
        // pEl.style.display="none"
        
         questionEl.textContent=i.quest;
         ilEl[0].textContent=i.options[0];
         ilEl[1].textContent=i.options[1];
         ilEl[2].textContent=i.options[2];
        
    }
   //This function Calculate and displays timer
    function startTimer() 
        {
        // Sets timer
             timer = setInterval(function() {
             timerCount--;
             timerEl.textContent ="Timer :"+ timerCount;
           if (timerCount == 0) 
              {
               clearInterval(timer);
               gameOver();
               }
            }, 1000);
         }
     //Event listener on Each choice made by the User
    liEl.addEventListener("click",function(event){
        var answuer=event.target
        
       choiceChecker(answuer) 
       
   
             }) 
     //Function That evaluates the User's answuer and calculate Scores accordingly       
     function choiceChecker(choice)
        {
                 
          if (questions[position].correct===choice.textContent) 
           {
             pEl.style.display="block"
             pEl.textContent="Correct ✔️";
             finalScore=finalScore + 20;
                                 
              }
          else{
               pEl.style.display="block"
               pEl.textContent="Wrong ❌"
               if(timerCount<=10){
                    timerCount=0; 
                    clearInterval(timer);
                    liEl.style.display="none"
                    gameOver();
                    return
                    }
                  else
                timerCount= timerCount-10;

              } 
          if(position < questions.length-1)
              {
                  position++;
                  displayQuestion();
               } 
                else {
                 clearInterval(timer);
                 gameOver();
               }
           
        }
        //function that is executed When User has responded to all Questions or Timer is over
        function gameOver()
       {
            liEl.style.display="none"
            
            overEl.style.display="block"
            titleEl.textContent="All Done!!!"
            scoreEl.textContent="Your Final score is: " + finalScore;
            timerEl.textContent="Timer :"+ timerCount;
        
          }
          //Event listener to the Submit Button
            submitEl.addEventListener("click",scoreSet)

               //This function Takes take the initials from User,with the score
               //add them and stores to the Array of objects Highscores i Local storage
                function scoreSet()
                {                                  
                  overEl.style.display="block"
                    
                     var scoreSaver =
                          {
                      initials:initialEl.value ,
                      score:finalScore,
                           } 
                            titleEl.textContent="Your Score"
                    //scoreEl.textContent = scoreSaver.initials + " - " + scoreSaver.score;
                              submitEl.style.display="none"
                              labelEl.style.display="none"
                              scoreEl.style.display="none"
                              initialEl.style.display="none"
                              clearEl.style.display="inline-block"
                              backEl.style.display ="inline-block"
                              listScoreEl.setAttribute("style","background:#75b9bd;width:100px")
                              listScoreEl.textContent=scoreSaver.initials + " - " + scoreSaver.score;
                     
                     var highScore=JSON.parse(localStorage.getItem("Scores")) || [] ;
                     highScore.push(scoreSaver);
                     localStorage.setItem("Scores", JSON.stringify(highScore));
                      initialEl.textContent="";

                                       
                   } 
                   //this function Gets the High scores stored in local storage and
                   //Displays the top 5          
                  function renderHighScore() {

                    homeEl.style.display="none"
                    liEl.style.display="none"
                    overEl.style.display="block"
                    titleEl.textContent="High scores"
                    //scoreEl.textContent = scoreSaver.initials + " - " + scoreSaver.score;
                    submitEl.style.display="none"
                    labelEl.style.display="none"
                    scoreEl.style.display="none"
                    initialEl.style.display="none"
                    clearEl.style.display="inline-block"
                    backEl.style.display ="inline-block"
                    listScoreEl.textContent="";

                    var highScore = JSON.parse(localStorage.getItem("Scores"))
                    //sort the array according to the score property
                    highScore.sort(function (a, b) {
                      return a.score < b.score ? 1 : -1;
                    });
                    highScore.splice(5);
                      for (var i = 0; i < highScore.length; i++) {
                      var scoreData = highScore[i];
                  
                      var li = document.createElement("li");
                      li.setAttribute("style","background:#75b9bd;margin:10px;font-size:15px;width:120px");
                      li.textContent = scoreData.initials + " - " + scoreData.score; ;
                     
                      listScoreEl.appendChild(li);
                     }
                  }
                   //listener to the back button,that allows to restart the Quiz
                  backEl.addEventListener("click",init)
                  function init() {
                    overEl.style.display="none"
                    liEl.style.display="none"
                    homeEl.style.display="block";
                    submitEl.style.display="block"
                    labelEl.style.display="block"
                    scoreEl.style.display="block"
                    initialEl.style.display="block"
                    clearEl.style.display="none"
                    backEl.style.display ="none"
                    //finalScore=0;
                    listScoreEl.textContent=""
                    initialEl.value=""
                    pEl.style.display="none"
                                    
                  }
                  // Add event listener to View High score button
                viewEl.addEventListener("click",renderHighScore)
                  // Add event listener to clear High score button,that deletes all the scores stored in local storage
                clearEl.addEventListener("click",function(){

                  localStorage.clear();
                  renderHighScore();
                })

                  

              
    

    
    
    
    





