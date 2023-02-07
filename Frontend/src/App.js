import './App.css';
import React, { useState, useRef, useEffect, createContext } from 'react';
import Content from './Components/Content';


export const Global = createContext();
function App() {

  const id = useRef();
  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState({});
  const [count, setCount] = useState(0);
  const [_id, setId] = useState();

  function myChange(e) {
    const { name, value } = e.target;
    setData1({ ...data1, [name]: value });
  }
  const handleDelete = (index,id) => {
    setData(data.filter((v, i) => i !== index));
    delChild(id);
  }

  const handleEdit = (index,_id) => {
    id.current.value = data[index].id;
    name.current.value = data[index].name;
    email.current.value = data[index].email;
    phone.current.value = data[index].phone;
    setCount(index);
    setId(_id);
  }

  const func = (person) => {
    if (count === 0) {
      setData([...data, person]);
      postChild(person);
    }
    else {
      let newData = [...data];
      newData[count] = person;
      setData(newData);
      updateChild(_id,person);
      setCount(0);
    }
    setData1("");

  };

  const postChild = async (person) => {
    try {
      await fetch("http://10.240.0.33:4000/create", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
      }).then(response => response.json())
        .then(data => {

          console.log(data);
          display();
        });
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }

  const delChild = async (id) => {
    try {
      await fetch("http://10.240.0.33:4000/delete/" + id, {
        method: 'DELETE'
      });
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }

  const updateChild = async (id,person) => {
    try {
      await fetch("http://10.240.0.33:4000/update/" + id, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
      }).then(response => response.json())
        .then(data => {

          console.log(data);
          display();
        });


    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }

  async function display() {
    let url = await fetch("http://localhost:4000/show");
    let data = await url.json();
    setData(data);
  }
  useEffect(() => {
    display();
  }, [])

  return (
    <>
      <Global.Provider value={{ myApi: data, data1: data1, id:id, name: name, email: email, phone: phone, myFunc: func, myChange: myChange, handleDelete: handleDelete, handleEdit: handleEdit }}>
        <Content />
      </Global.Provider>
    </>
  );
}

export default App;
