//variables to store essential length selection controls
var lengthNextBtn = document.querySelector("#btnLength");
var lengthTxtBox = document.querySelector("#lengthTxt");
var passwordLength = 12;

//button to generate password at the second step
var generateBtn = document.querySelector("#generate");

var password = "";

//function that checks length requirements were entered properly
function checkLenghtCriteria(){
  var length = lengthTxtBox.value;
  if(!isNaN(length))
  {
    //if everything is entered correctly, store info, hide length block, and move on
    if (parseInt(length) >= 8  && parseInt(length) <= 128)
    {
      passwordLength = parseInt(length);
      document.querySelector("#password-length").style.display = "none";
      document.querySelector("#password-criteria").style.display = "block";
      document.querySelector(".card-footer").style.display = "block";
    }
    else
    {
      lengthTxtBox.value = "";
      alert("Please enter character number between " + 8 + " and " + 128 + ".");
    }
  }
  else
  {
    lengthTxtBox.value = "";
    alert("Please enter character number between " + 8 + " and " + 128 + ", and nothing else.");
  }
}

function checkOtherCriteria(){
  //store boolean values for user selected criteria
  var lower = document.getElementById("chkLower").checked;
  var upper = document.getElementById("chkUpper").checked;
  var special = document.getElementById("chkSpecial").checked;
  var numbersArray = document.getElementById("chkNums").checked;
  var criteriaList = [lower, upper, special, numbersArray];
  //an idea to decrease chance of missing criteria requirements upon generation
  var criteriaChance = [100, 100, 100, 100];



  var lowercase = ['q','w','e','r','t','y','u','i','o','p',
  'a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
  var uppercase = ['Q','W','E','R','T','Y','U','I','O','P',
  'A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
  //!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~
  var specialChar = ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", 
  ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`",
   "{", "|", "}", "~"];
  var numbersArray = ['1','2','3','4','5','6','7','8','9','0'];

  if (!lower && !upper && !special && !numbersArray)
  {
    return alert("Select at least a single password criteria");
  }
  else
  {
    var randInt;
    //continue generation until the length entered by user is met
    while(password.length < passwordLength)
    {
      //randomly select criteria
      randInt = Math.floor(Math.random() * 4);
      if (criteriaList[randInt] === true)
      {
        if (criteriaChance[randInt] === 50)
        {
          // if criteria has been selected during latest entry, 
          // decrease it chance of appearing during current move
          if ((Math.floor(Math.random()*2+1))===2)
          {
            continue;

          }
          else
          {
            criteriaChance[randInt] = 100;
          }
        }
        if (criteriaChance[randInt] === 100)
        {
          switch(randInt)
          {
            //after entry from given criteria array is selected, 
            //criteria's chance of drop for next move is decreased

            case 0:
            criteriaChance = [50, 100, 100, 100];
            randInt = Math.floor(Math.random()*26);
            password += lowercase[randInt];
            break;

            case 1:
            criteriaChance = [100, 50, 100, 100];
            randInt = Math.floor(Math.random()*26);
            password += uppercase[randInt];
            break;

            case 2:
            criteriaChance = [100, 100, 50, 100];
            randInt = Math.floor(Math.random()*31);
            password += specialChar[randInt];
            break;

            case 3:
            criteriaChance = [100, 100, 100, 50];
            randInt = Math.floor(Math.random()*10);
            password += numbersArray[randInt];
            break;  
          }
          // alert(password.length);
        }
      }
    }
    //after generation is complete, display the password and hide uneeded data
    document.querySelector("#password-criteria").style.display = "none";
    document.querySelector("#password-wrapper").style.display = "block";
    document.querySelector(".card-footer").style.display = "none";
    document.querySelector("#password").value = password;
    document.querySelector("#header-text").innerHTML = "Your password is ready!";
    document.querySelector(".card-footer").style.display = "none";
  }
}

//event listeners
lengthNextBtn.addEventListener("click", checkLenghtCriteria);
generateBtn.addEventListener("click", checkOtherCriteria);