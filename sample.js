// Pure javascript - Add 'submit' event listener to form with id="myForm"
// more info: https://www.w3schools.com/js/
// document.querySelector('#myForm').addEventListener('submit', function(e) {
//  console.log("Submittied"); 
// });

// or JQuery - Add 'submit' event listener to form with id="myForm"
// more info: https://www.w3schools.com/jquery/default.asp
// $("myform").submit(function(e){
//   console.log("Submitted");
// });

let name = document.querySelector("#name");
let url = document.querySelector("#url");
let submit = document.querySelector("#sub");
let mysto = window.localStorage;
let count = localStorage.length;

submit.addEventListener("click",function(){
  if(name.value != "" && url.value != "" && validURL(url.value)){
    console.log("pass");
    count++;
    add();
  }else if(name.value == ""){
    alert("Wrong Site Name");
  }else if(url.value == "" || !validURL(url.value)){
    alert("Wrong URL");
  }
});

console.log(localStorage);
create_table();

function add(){
  // let table = document.querySelector("#bookmark-list");
  // let row = table.insertRow();
  // let cell_1 = row.insertCell(0);
  // let cell_2 = row.insertCell(0);
  // let newtext = document.createTextNode(name.value);
  // cell_1.appendChild(newtext);
  // newtext = document.createTextNode(url.value);
  // cell_2.appendChild(newtext);
  let st = name.value + " " + url.value;
  localStorage.setItem(count,st);
  count++;
}

function create_table(){
  let table = document.querySelector("#bookmark-list");
  for(let i = 1; i <= localStorage.length ; i++){
    let row = table.insertRow();
    let cell_1 = row.insertCell(0);
    let cell_2 = row.insertCell(0);
    let cell_3 = row.insertCell(0);
    let text = localStorage.getItem(i).split(" ");
    let newtext = document.createTextNode(text[0]);
    cell_3.appendChild(newtext);
    let a = document.createElement('a');
    //a.href = document.createTextNode(text[1]);
    a.setAttribute('href',text[1]);
    a.innerHTML = text[1];
    cell_2.appendChild(a);
    let img = document.createElement('img');
    img.addEventListener("click",function(){
      let temp = i;
      for(let j = 1 ; j <= localStorage.length ; j++){
        if(j > temp){
          localStorage.setItem(j-1,localStorage.getItem(j));
        }
        if(j == localStorage.length){
          localStorage.removeItem(j);
        }
      }
      location.reload();
    });
    img.src = './img/cancel.png'
    cell_1.appendChild(img);
  }
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}



