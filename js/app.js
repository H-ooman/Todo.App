const taxtInput = document.getElementById("text-input");
const dateInput = document.getElementById("date-input");
const addbtn= document.getElementById("add-btn");
const editbtn= document.getElementById("edit-btn");
const alertmeesge = document.getElementById("alert-meesge");
const todosBody = document.querySelector("tbody");
const deleteallbtn = document.getElementById("delete-all-btn");
const filtrBtn = document.querySelectorAll(".filter-todos"); 

let todos = JSON.parse(localStorage.getItem("todos")) || [];

//id
const generateId = () => {
  return  Math.round(Math.random()*Math.random()*Math.pow(10,15)).toString();
}
//alert
const showAlert = (message,type) => {
    alertmeesge.innerHTML = ""; 
    const alert = document.createElement("p");
    alert.innerText = message;
    alert.classList.add("alert");
    alert.classList.add(`alert-${type}`);
    alertmeesge.append(alert);

    setTimeout(() => {
        alert.style.display = "none";
    },2000);
}
//display Todo
const displayTodos = (data) => { 
    const todolist = data ||todos;
    todosBody.innerHTML = "";
    if(!todolist.length){
        todosBody.innerHTML = "<tr><td colspan='4'> NO task found!</td></tr>";
        return;
    }
    todolist.forEach((todo) => {
        todosBody.innerHTML +=
        `
        <tr>
            <td>${todo.task}</td>
            <td>${todo.date ||"No date"}</td>
            <td>${todo.completed ? "completed" : "pending"}</td>
            <td>
                <button onclick="editHandeler('${todo.id}')">Edit</button>
                <button onclick="toggelHandeler('${todo.id}')">${todo.completed ? "Undo" : "Do"}</button>
                <button onclick="deletehandeler('${todo.id}')">Delete</button>
            </td>
        </tr>`
    });
}
//save to local storge
const saveToLocalStorge = () => {
    localStorage.setItem("todos",JSON.stringify(todos));
}
//add
const addHandeler = () => {
    const task = taxtInput.value;
    const date = dateInput.value;
    const todo = {
        id : generateId(),
        task:task,
        date:date,
        completed:false,
    };
    if(task){
        todos.push(todo);
        saveToLocalStorge();
        displayTodos();
        taxtInput.value="";
        dateInput.value="";
        showAlert("todo added successfully","success")
    }
    else{
        showAlert("please Enter a todo","error");
    }
};
//delete All
const deleteallHandeler = () => {
    if (todos.length){
    todos = [];
    saveToLocalStorge();
    displayTodos();
    showAlert("All todos cleared successfully","success");
    }else {
        showAlert("No todos to clear", "error")
    }
};
//delete
const deletehandeler = (id) => {
 const newTodos = todos.filter(todo => todo.id !== id );
 todos = newTodos;
 saveToLocalStorge();
 displayTodos();
 showAlert("todo deleted successfully","success");
};
//toggel 
const toggelHandeler = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    saveToLocalStorge();
    displayTodos();
    showAlert("Todo staus changed successfully","success");
};
//Edit
const editHandeler = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    taxtInput.value = todo.task;
    dateInput.value = todo.date;
    addbtn.style.display = "none";
    editbtn.style.display = "inline-block";
    editbtn.dataset.id = id;
};
//Applye Edit
const applyeEditHAndeler = (event) => {
    const id = event.target.dataset.id;
    const todo = todos.find((todo) => todo.id = id);
    todo.task = taxtInput.value; 
    todo.date = dateInput.value;
    taxtInput.value="";
    dateInput.value="";
    addbtn.style.display = "inline-block";
    editbtn.style.display = "none";
    saveToLocalStorge();
    displayTodos();
    showAlert("Todo edited successfully","success"); 
};
//Filter
const filterHandeler = (event) => {
    let filterTodos = null;
    const filter = event.target.dataset.filter;
    switch (filter) {
        case "pending":
            filterTodos = todos.filter(todo => todo.completed === false);
            break;
            case "completed":
                filterTodos = todos.filter(todo => todo.completed === true);
                break;
    
        default:
            filterTodos =  todos;
            break;
    }
    displayTodos(filterTodos);
};
//Add Event
window.addEventListener("load",() => displayTodos());
addbtn.addEventListener("click", addHandeler);
deleteallbtn.addEventListener("click",deleteallHandeler);
editbtn.addEventListener("click",applyeEditHAndeler);
filtrBtn.forEach ((button) => {
    button.addEventListener("click",filterHandeler);
});