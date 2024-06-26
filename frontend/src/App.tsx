import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./routes/Signup";
import { Blog } from "./routes/Blog";
import { Signin } from "./routes/Signin";
import Home from "./routes/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = { <Home />} />
          <Route path="/signup" element = { <Signup />} />
          <Route path="/signin" element = { <Signin />} />
          <Route path="/blog" element = { <Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App