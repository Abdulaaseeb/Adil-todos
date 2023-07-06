// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, onValue, push,   } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXK2Z1GsgzBqTcn1CpuHqfVTdZcUStvc8",
    authDomain: "adil-todo-app-304.firebaseapp.com",
    projectId: "adil-todo-app-304",
    storageBucket: "adil-todo-app-304.appspot.com",
    messagingSenderId: "116738518759",
    appId: "1:116738518759:web:6cc797b1258e510c43bc42"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)


var list = document.getElementById("list")
var todo_item = document.getElementById('todo')
window.addTodo = function () {
    // create li element with text node 
    var li = document.createElement("LI")
    var liLabel = document.createTextNode(todo_item.value)
    li.appendChild(liLabel)
    // create delete button with attribute
    var btn = document.createElement("BUTTON")
    var btnLabel = document.createTextNode("DELETE")
    btn.setAttribute("class", "btn btn-danger button")
    btn.setAttribute("onclick", "getDel(this)")
    btn.appendChild(btnLabel)
    // create edit button with attribue
    var editbtn = document.createElement("BUTTON")
    var editbtnLabel = document.createTextNode("EDIT")
    editbtn.setAttribute("class", "btn btn-danger")
    editbtn.setAttribute("onclick", "getedt(this)")
    editbtn.appendChild(editbtnLabel)
    li.appendChild(btn)
    li.appendChild(editbtn)
    list.appendChild(li)
    var idRef = ref(database, "todos/")
    var id = push(idRef).key
    var obj = {
        todo_item: todo_item.value,
        id: id
    }
    var reference = ref(database, `todos/${id}/`)
    set(reference, obj)
    list.innerHTML = ''
    getTodos()
    todo_item.value = ""
}
function getTodos(){
    var ref2 = ref(database,"todos/")
    onValue(ref2,function(snapshot){
      var datalist = snapshot.val()
      var dataObj = Object.values(datalist)
      render(dataObj)
    })
}
function render(dataArr){
   for(var i = 0; i < dataArr.length; i++){
    list.innerHTML  += `<li>${dataArr[i].todo_item}</li>`
   }
}
window.getDel = function (e) {
    e.parentNode.remove()
}

window.getedt = function (g) {
    var editVal = prompt("Enter Edit Value", g.parentNode.firstChild.nodeValue)
    g.parentNode.firstChild.nodeValue = editVal
}

window.deleteAll = function () {
    // list.innerHTML = ""
    var idRef = ref(database, "todos/")
    var id = push(idRef).key
    var obj = {
        todo_item: todo_item.value,
        id: id
    }
    var reference = ref(database,`todos/${id}`)
    for(var i = 0; i < obj.length; i--){
        list.innerHTML  = ''
       }
}



