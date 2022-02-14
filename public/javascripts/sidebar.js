let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");
let searchBtn = document.querySelector(".bx-search");

btn.onclick = function () {
  sidebar.classList.toggle("active");
}

searchBtn.onclick = function () {
  let searchField = document.querySelector("#searchBtn").value; 
  if(!searchField == ""){
    // search page for any match
    // searchField;
  } else 
  sidebar.classList.toggle("active");
}
