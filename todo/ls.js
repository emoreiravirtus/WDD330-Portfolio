export default class localStorageController {
    setData(key, data) {
        localStorage.setItem(key, data);
    }
    pushTodo(todo) {
        let list = JSON.parse(localStorage.getItem('todoList'));

        if (!list || list == []) {
            list = [];
        }

        list.push(todo);

        this.setData('todoList', JSON.stringify(list));
    }
    deleteDataFromList(id) {
        let list = JSON.parse(localStorage.getItem('todoList'));

        list = list.filter(item => item.id != id)

        if(list.length) {
            this.setData('todoList', JSON.stringify(list));
        }
        else {
            localStorage.removeItem('todoList');
        }
    }
    toggleTodo(id) {
        let list = JSON.parse(localStorage.getItem('todoList'));

        list = list.map(item => {
            
            if(item.id == id) {
                item.completed = !item.completed;
            }

            return item;
        })

        this.setData('todoList', JSON.stringify(list));
    }
    deleteData(key) {
        localStorage.removeItem(key);
    }
    getData(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}