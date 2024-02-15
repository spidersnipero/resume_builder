import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";

import Register from "./Register";
import Resume from "./Resume";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {localStorage.getItem("user") == null ? (
          <>
            <Route path="/" element={<Login />} />
          </>
        ) : (
          <Route path="/" element={<Resume />} />
        )}
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
