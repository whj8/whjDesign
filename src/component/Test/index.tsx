import React from "react";
import axios from "axios";


const Test = ()=>{
  const get = async ()=>{
    const {data} = await axios.get('http://localhost:1299/abc',{withCredentials: true})
    console.log(data)
  }
  return(
    <button onClick={get}>BTN</button>
  )
}
export default Test