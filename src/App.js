import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import Posts from "./components/Posts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PostForm } from "./components/PostForm";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/posts" Component={Posts}></Route>
          <Route path="/posts/create" Component={PostForm}></Route>
          <Route path="/posts/:postId" Component={PostForm}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
