import './App.css';
import { useState,useEffect, } from 'react';
function App() {
  const [data1, setData1] = useState(0);
  const [data2, setData2] = useState(0);
  const [timeToFetch, setTimeToFetch] = useState(0);
  const [timeToFetch2, setTimeToFetch2] = useState(0);
  
  const styleObj = {
    fontSize: 4.3,
    color: "#000000",
    textAlign: "center",
}
const styleObj2 = {
  fontSize: 4.3,
  color: "#FF0000",
  textAlign: "center",
}
  async function retrieveEmp(){
    let time1= performance.now();
    var s = await fetch("https://datausa.io/api/data?University=142832&measures=Total%20Noninstructional%20Employees&drilldowns=IPEDS%20Occupation")
    let time2= performance.now();
    setData1(await s.json())
    setTimeToFetch((time2-time1))
  }
  async function fromredis() {
    let time1= performance.now();
    var s = await fetch("http://localhost:4000/redis/datausa1");
    let time2= performance.now();
    setData2(await s.json());
    setTimeToFetch2((time2-time1))
  }
  return (
    <div className="App">
     <h1>Redis Frontend</h1>
     <h2>Time to fetch without Redis: {timeToFetch.toString()}</h2>
     <button onClick={retrieveEmp}>From API</button>
    <h4 style={styleObj}>{JSON.stringify(data1)}</h4>
     <h2>Time to fetch with Redis: {timeToFetch2.toString()}</h2>
     
     <button onClick={fromredis}>From Redis</button>

     <h4 style={styleObj2}>{JSON.stringify(data2)}</h4>
    </div>
  );
}

export default App;
