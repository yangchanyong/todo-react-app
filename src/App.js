import './App.css';
import '@mui/material';
import Todo from './Todo';
import { useEffect, useState } from 'react';
import { Container, List, Paper } from '@mui/material';
import AddTodo from './AddTodo';
import { call } from './service/ApiService';

function App() {
  // const [item, setItem] = useState({id : 1, done : true, title: "제목"});
  const [items, setItems] = useState ([
    {id: "ID-1", done: true, title: "제목1"},
    {id: "ID-2", done: false, title: "제목2"},
  ]);

  let str = [];
  for(let i=0; i<items.length; i++) {
    str.push(<Todo item={items[i]} />)
  }

  const addItem = item => {
    // item.id = "ID-" + items.length;
    // item.done = false;
    // setItems([...items, item]);
    // console.log(items);
    call("/todo", "POST", item).then(resp => setItems(resp.data));
  }
  
  const deleteItem = item => {
    call("/todo", "DELETE", item).then(resp => setItems(resp.data));
    // setItems([...items.filter(e => e.id !== item.id)]);
  }
  
  const editItem = (item) => {
    // setItems([...items])
    call("/todo", "PUT", item).then(resp => setItems(resp.data));
  }

  const requestOptions = {
    method: 'GET',
    headers: {"Content-Type" : "application/json"},
  };

  useEffect(() => {
  //   fetch("http://localhost/todo", requestOptions)
  //   .then(resp => resp.json()) // 첫번째 할일
  //   .then(
  //     (resp) => {
  //       setItems(resp.data);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  // );
  call("/todo", "GET", null).then((resp) => setItems(resp.data));
}, []);  
  
  let todoItems = 
    items.length > 0 && 
    items.map((item) => (
      <Paper style={{margin: 16}}>
        <List>
          <Todo 
            item={item} 
            key={item.id} 
            deleteItem={deleteItem} 
            editItem={editItem}
          />
        </List>
      </Paper>
    ));
  return (
    <div className='App'>
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        {todoItems}
      </Container>
    </div>
  );
}

export default App;
