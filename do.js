let addMessage = document.querySelector('.message'),
 addButton = document.querySelector('.add'),
todo = document.querySelector('.todo');

 let todoList = [];

 if (localStorage.getItem('todo')) { //getting item
    todoList = JSON.parse(localStorage.getItem('todo')); //json Stringify to parse everything to str model
    displayMessages();
    }

addButton.addEventListener('click', function(){ //simple button click event + highlight 
    if(!addMessage.value) return;
let newTodo = {
    todo: addMessage.value,
    checked: false,
    important: false
};

todoList.push(newTodo); //setting item
displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList)); // setting local storage to "remember the data"
    addMessage.value ='';
});

 function displayMessages(){
    
    let displayMessage = '';
    if(todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i){ //displayMessage + check
         displayMessage += ` 
        <li>
        <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
        <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
        });
    }

todo.addEventListener('change', function(event){ //reaching attribute id
    let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML; //reaching text of label

todoList.forEach(function(item){

    if (item.todo === valueLabel){ //inverse of forLabel, the best joke that I could even think of
        item.checked = !item.checked;
        displayMessages();
        localStorage.setItem('todo', JSON.stringify(todoList));
    }
})

});


todo.addEventListener('contextmenu', function(event){ //CTRL + RIGHT CLICK  = DELETE
    event.preventDefault();
    todoList.forEach(function(item, i){
        if (item.todo === event.target.innerHTML){//let's take out someone's fingers from reaching missclick's position at the data
            if(event.ctrlKey || event.metaKey){
                todoList.splice(i, 1);
            }
            else{
                item.important = !item.important;
            }
        
        item.important = !item.important;
        displayMessages();
        localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

// test code for changing theme color, at least to make them 2-3





