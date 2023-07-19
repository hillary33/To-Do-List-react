import './App.css'
import {useState} from 'react';
import Todo from './components/Todo'
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

function App(){ //todos os elementos que queremos
  const [all, setAll] = useState([
    {
      id: 1,
      text: "Andar para ficar bem",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para a faculdade",
      category: "Estudos",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Assistir séries",
      category: "Lazer",
      isCompleted: false,
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  //adicionar elementos
  const addTodo = (text, category) => {
    const newTodo = [
      ...all,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      },
    ];
    setAll(newTodo);
  };

  //remover elementos
  const removeTodo = (id) => {
    const newTodo = [...all];
    const filteredAll = newTodo.filter((todo) => todo.id !== id);
    setAll(filteredAll);
  };

  //marcar como completados
  const completeTodo = (id) => {
    const newTodo = [...all];
    newTodo.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo);
    setAll(newTodo);
  }
  
  return <div className="app">
    <h1>Lista de tarefas</h1>
    <Search search={search} setSearch={setSearch} />
    <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
    <div className="todo-list">
    {all
  .filter((todo) =>
    filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted
  )
  .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase())).sort((a, b) => sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
  )
  .map((todo) => (
    <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo} />
  ))}
    </div>
    <TodoForm addTodo={addTodo}/>
  </div>
}


export default App
