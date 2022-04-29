import TodoList from "./components/TodoList";
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { useCallback, useEffect, useState } from "react";
import { v4}  from 'uuid';


function App() {
  //Set for TodoList
  const [todoList,setTodoList]=useState([]);

  //Set for TextInput 
  const [textInput,settextInput]=useState("");

  const onTextInputChange= useCallback((e) =>{
    settextInput(e.target.value);
  },[] );

  const onAddBtnClick = useCallback((e) =>{
    // Add textInput to TodoList
    setTodoList([{id: v4(),name:textInput,isCompleted: false},...todoList])
    settextInput("");
  },[textInput,todoList]);

  //method to check competed 
  const onCheckBtnClick = useCallback((id) =>{
    setTodoList(prevState => prevState.map(todo => todo.id ===id?{...todo, isCompleted:true} : todo))
  },[])

  const TODO_APP_STORAGE_KEY="TODO_APP";

 //get data from local storage
 useEffect(() => {
  const storageTodoList=localStorage.getItem(TODO_APP_STORAGE_KEY);
  if(storageTodoList){
    setTodoList(JSON.parse(storageTodoList));
  }
},[])

  // save todoList to local storage
  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY,JSON.stringify(todoList));
  },[todoList]);



  return (
    <>
      <h3>List need to do:</h3>
      <Textfield name="add-todo" placeholder="Add to List ..." elemAfterInput={
        <Button isDisabled ={!textInput} appearance='primary' onClick={onAddBtnClick} >Add</Button>
      }
      css={{padding:"2px 4px 2px"}}
      value={textInput}
      onChange={onTextInputChange}
      ></Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick}/>
    </>
  )
}

export default App;
