import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Editorpage from "./pages/Editorpage/Editorpage";
import "./global.css";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            theme: {
              primary: "#4aed88",
            },
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/editor/:roomid" element={<Editorpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
