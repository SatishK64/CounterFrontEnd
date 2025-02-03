import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'

const App = () => {
  const nav = useNavigate();
  const [count, setCount] = useState(0);
  const [average, setAverage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        var date = new Date();
        date = date.toISOString().slice(2, 10); 
        const res = await fetch(`/counter/GetData/${date}`);
        console.log(date);
        if (res.status === 200) {
          const data = await res.json();
          setCount(data.value);
        }else{
          const res = await fetch(`/counter/AddDate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"value":0})
          });
          if (res.status === 200) {
            setCount(0);
          }
        }


        const res1 = await fetch(`/counter/Average`);
        const data = await res1.json();
        console.log(data);
        if(res1.status === 200){
          
          setAverage(data.value);
        }else{
          alert("error");
        } 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(`/counter/Average`);
        const data = await res1.json();
        if(res1.status === 200){
          setAverage(data.value);
        }else{
          alert("error");
        } 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  },[count])

  async function handleIncrement() {
    var date = new Date().toISOString().slice(2, 10);
    try{
      const res = await fetch(`/counter/getData/${date}`); 
      if(res.status === 200){
        const data = await res.json();
        const res1 = await fetch(`/counter/AddDate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"value":data.value+1})
        });
        if(res1.status === 200){
          setCount(data.value+1);
          const restot = await fetch("/counter/IncrementTot");
          if(!restot.status === 200){
            alert("error-total");
          }
          if(count === 0){
            const res2 = await fetch('/counter/Increment');
            if(res2.status === 200){
            }else{
              alert("error");
            }
          }
        }
        else{
          console.log("error");
        }
      }
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>
      <div className="card">
      <h1 style={{width:"100%"}}>Average = {average.toFixed(2)}</h1>
        <button onClick={handleIncrement}>
          count is {count}
        </button>
        <button style={{marginLeft:"25px"}}onClick={()=>{nav('/data')}}>View Data</button>
      </div>
    </div>
  );
};

export default App;
