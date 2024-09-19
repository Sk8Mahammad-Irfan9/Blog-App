import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreateBlog from "./pages/CreateBlog";
import { UserContextProvider } from "./UserContext";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />

          <Route path="/write-blog" element={<ProtectedRoute />}>
            <Route path="blog" element={<CreateBlog />} />
          </Route>

          <Route path="/" element={<HomePage />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
