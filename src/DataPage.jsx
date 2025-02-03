import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function(){
    const nav= useNavigate();
    const [Data,setData] = useState({});
    useEffect(()=>{
        const getData = async()=>{
            try{
                var l = await (await fetch("/counter/data")).json();
                setData(l.data);

            }
            catch(error){
                console.log(error.message)
            }
        }
        getData();  
    },[])
    return(
        <div className="page?" style={{width:"100%",height:"100%"}}>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <input type="button" style={{width:"5%",height:"50px"}} value={"Back"} onClick={()=>{nav('/')}} />
            <h1 style={{width:"95%",textAlign: "center",borderRadius:"10px"}}>Recent Data</h1>
            </div>
            <div className="container" style={{display:"flex", flexWrap:'wrap',gap:"15px"}}>
                {Object.keys(Data).map((key)=>{
                    return(
                        <div key={key} style={{width:"100px",height:"125px",backgroundColor:"#0a0a0aa0",borderRadius:"10px" }}>
                            <h4>{key.split("-").reverse().join("-")}</h4>
                            <h2>{Data[key]}</h2>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}