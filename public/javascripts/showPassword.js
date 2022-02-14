function ShowPassword(){
  var includeLowerCase = document.querySelector('#passwordIncludeLowerCase').checked
  var includeUpperCase = document.querySelector('#passwordIncludeUpperCase').checked
  var includeNumbers = document.querySelector('#passwordIncludeNumbers').checked
  var includeSymbols = document.querySelector('#passwordIncludeSymbols').checked

  var lowerCase = "abcdefghijklmnopqrstuvxyz"
  var upperCase = "ABCDEFGHIJKLMNOPQRSTUVXYZ"
  var numbers = "0123456789"
  var symbols = "!@#$%^&*()~`/'{}[]|';:<>,.?*-+"
  var totalCategories = 0
  var categoriesArray =[]

  if(includeLowerCase == true){
    totalCategories++
    categoriesArray.push("lowerCase")
  }
  if(includeUpperCase == true){
    totalCategories++
    categoriesArray.push("upperCase")
  }
  if(includeNumbers == true){
    totalCategories++
    categoriesArray.push("numbers")
  }
  if(includeSymbols == true){
    totalCategories++
    categoriesArray.push("symbols")
  }
  
  // Define password length
  var passwordLength = document.querySelector('#passwordLength').value

  // Initialize password
  var password = ""

  // Loop
  var i = 0
  while(i < passwordLength){
    var chooseGroup = Math.floor(Math.random() * categoriesArray.length)
    
    if(categoriesArray[chooseGroup] == "lowerCase" ){
      // lower case
      password += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length))
    } else if (categoriesArray[chooseGroup] == "upperCase") {
      // upper case
      password += upperCase.charAt(Math.floor(Math.random() * upperCase.length))
    } else if (categoriesArray[chooseGroup] == "numbers") {
      // number
      password += numbers.charAt(Math.floor(Math.random() * numbers.length))
    } else if (categoriesArray[chooseGroup] == "symbols") {
      // symbol
      password += symbols.charAt(Math.floor(Math.random() * symbols.length))
    }
    i++
  }

  // Push password
  document.querySelector('#card-footer').innerHTML =  `
    <div class="alert alert-secondary alert-dismissible fade show" role="alert">
      <div class="d-flex">
        <span class="p-0 m-0 mx-1">
          <div class="card-text mx-4" ><strong>Generated Password</strong></div>
        </span>
        <input id="genertedPassword" class="w-50" type="text" value="${password}">
        <span class="input-group-text p-0 m-0">
          <button class="btn text-nowrap btn-outline-secondary copy" onclick="copyToClipboard(document.querySelector('#genertedPassword').value)">
            <i class="bx bx-copy"></i>
          </button>
        </span>      
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `
}