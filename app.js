var todoList = {
  todos: [],
  addTodos: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function (position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;

  },
  toggleAll: function () {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }

    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }

  }
};


var handlers = {
  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  },
  addTodos: function () {
    var addTodoTextInput = document.getElementById("addTodoTextInput");

    todoList.addTodos(addTodoTextInput.value);
    addTodoTextInput.value = "";

    view.displayTodos();
  },
  changeTodo: function () {
    var position = document.getElementById("position");
    var changeTodoTextInput = document.getElementById("changeTodoTextInput");

    todoList.changeTodo(position.valueAsNumber, changeTodoTextInput.value);
    position.value = "";
    changeTodoTextInput.value = "";

    view.displayTodos();
  },
  deleteTodo: function (position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function () {
    var toggleCompleted = document.getElementById("toggleCompleted");

    todoList.toggleCompleted(toggleCompleted.valueAsNumber);
    toggleCompleted.value = "";

    view.displayTodos();
  }
};

var view = {
  displayTodos: function () {
    var todoUl = document.querySelector("ul");
    todoUl.innerHTML = "";

    for (var i = 0; i < todoList.todos.length; i++) {
      var todo = todoList.todos[i];
      var todoLi = document.createElement("li");
      var textWithCompletion = "";

      if (todo.completed === true) {
        textWithCompletion = "(x) " + todo.todoText;
      } else {
        textWithCompletion = "( ) " + todo.todoText;
      }

      todoLi.id = i;
      todoLi.textContent = textWithCompletion;
      todoLi.appendChild(this.deleteButton());
      todoUl.appendChild(todoLi);
    }
  },
  deleteButton: function () {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteBtn";
    return deleteButton;
  },
  eventListeners: function () {
    var todoUl = document.querySelector("ul");
    todoUl.addEventListener("click", function (event) {
      var elementClicked = event.target;

      if (elementClicked.className === "deleteBtn") {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.eventListeners();