import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import React from "react";
import App from "./App";
import DataPage from "./DataPage";
export default function Divider(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path='/data' element ={<DataPage />} /> 
            </Routes>
        </Router>
    );
}