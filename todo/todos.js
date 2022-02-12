import localStorageController from './ls.js'

const ls = new localStorageController();
const addInput = document.querySelector('#add-todo-input');
const addButton = document.querySelector('#add-todo-button');
const todosContainer = document.querySelector('.todos-container');
const allFilterButton = document.querySelector('#all-filter-button');
const completedFilterButton = document.querySelector('#completed-filter-button');

let showingAll = true;

const addTodo = () => {
    if (addInput.value) {
        const todo = { 
            id: Date.now(),
            content: addInput.value,
            completed: false
        };
        
        ls.pushTodo(todo);
        addInput.value = '';
        renderTodos();
    }
}

addButton.addEventListener('click', addTodo);

const activateShowingAll = () => {
    showingAll = true;
    allFilterButton.classList.add('btn-active');
    completedFilterButton.classList.remove('btn-active');
    renderTodos();
}

const deactivateShowingAll = () => {
    showingAll = false;
    completedFilterButton.classList.add('btn-active');
    allFilterButton.classList.remove('btn-active');
    renderTodos();
}

completedFilterButton.addEventListener('click', deactivateShowingAll);

allFilterButton.addEventListener('click', activateShowingAll);

const renderTodos = () => {
    todosContainer.innerHTML = '';

    let todoList = ls.getData('todoList');

    if(!todoList) {
        document.querySelector('#tasks-left').innerHTML = `0 tasks left`;
        todosContainer.innerHTML = 'No tasks to do.'
        return;
    }

    let tasksLeft = todoList.length;

    if(!showingAll) {
        todoList = todoList.filter(item => item.completed);
    }

    for (let todo in todoList) {
        let item = todoList[todo];
        
        if(item.completed) tasksLeft -= 1;

        todosContainer.innerHTML += `
        <div class="todo">
            <div id="todo-checkbox"></div>
            <div id="todo-name">
                <p>${item.content}</p>
            </div>
            <div class="btn bg-red">X</div>
        </div>
        `;
        
        if(item.completed) {
            todosContainer.children[todo].querySelector('#todo-checkbox').innerHTML = 'X';
            todosContainer.children[todo].querySelector('p').classList.add('completed');
        }
    }

    let elementList = todosContainer.querySelectorAll('.todo');
    for (let todo in elementList) {
        if(todo < todoList.length) {
            let checkbox = elementList[todo].querySelector('#todo-checkbox');
            let button = elementList[todo].querySelector('.btn');

            button.addEventListener('click', () => {
                ls.deleteDataFromList(todoList[todo].id);
                renderTodos();
            })

            checkbox.addEventListener('click', () => {
                ls.toggleTodo(todoList[todo].id);
                renderTodos();
            })
        }
    }

    document.querySelector('#tasks-left').innerHTML = `${tasksLeft} tasks left`;
}

renderTodos();
