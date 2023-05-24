import '@mui/material';
import { Container, List, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import Navigation from './Navigation';
import Todo from './Todo';
import { call } from './service/ApiService';
import AppTodo from './AddTodo';

function App() {
  const [loading, setLoading] = useState(true);

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

  // const requestOptions = {
  //   method: 'GET',
  //   headers: {"Content-Type" : "application/json"},
  // };

  useEffect(() => {
    call("/todo", "GET", null).then((resp) => setItems(resp.data));
    setTimeout(() => {
      setLoading(false);
    }, 300)
}, []);  
  
  // let todoItems = items && items.length > 0 &&  items.map((item) => (
  //     <Paper style={{margin: 16}}>
  //       <List>
  //         <Todo 
  //           item={item} 
  //           key={item.id} 
  //           deleteItem={deleteItem} 
  //           editItem={editItem}
  //         />
  //       </List>
  //     </Paper>
  //   ));
  let todoItems = items && items.length > 0 &&  (
      <Paper style={{margin: 16}}>
        <List>
          {items.map((item) => (
          <Todo 
            item={item} 
            key={item.id} 
            deleteItem={deleteItem} 
            editItem={editItem}
          />
          ))}
        </List>
      </Paper>
    );
  return (
    <div className='App'>
      {loading ? (
        <h1>로딩중 ..</h1>
      ) : ( 
      <div>
        <Navigation />
        <Container maxWidth="md">
          <AppTodo addItem={addItem} />
          {todoItems}
        </Container>
      </div>
      )}
    </div>
  );

}

export default App;
