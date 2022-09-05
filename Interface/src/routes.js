import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './tela/home/home'
import Email  from "./tela/email/email";

function Router() {
    return (
      <div>
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/email" element={<Email />}></Route>
        </Routes>
    </BrowserRouter>
      </div>
    );
  }
  
  export default Router;