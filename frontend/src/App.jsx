import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Events from "./components/Events";

function App() {
  const current_user_id = 2;
  return (
  <>
    <Header currentUserId={current_user_id} />

    <div id = "main">
      <Sidebar />

      <div style= {{flex: 1}}>
        <Events />
      </div>
    </div>
  </>
  );
}

export default App;