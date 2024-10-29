import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:3004/posts");
      const data = await response.data;
      console.log(data);
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1>Post List</h1>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 && (
                <tr>
                  <td colSpan={3}>Không có dữ liệu</td>
                </tr>
              )}
              {posts.length > 0 &&
                posts.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.views}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
