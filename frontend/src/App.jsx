import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Events from "./components/Events";

function App() {
  const current_user_id = 2;
  return (
  <BrowserRouter>
    <Header currentUserId={current_user_id} />

    <div id = "main">
      <Sidebar />

      <div className="content-area">
        <Events />
      </div>
    </div>
  </BrowserRouter>
  );
}

export default App;