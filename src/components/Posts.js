import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils";
import { PostItem } from "./PostItem";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const fetchPosts = async () => {
  return await axios.get(`${API_URL}/posts`);
};

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then((response) => {
      setPosts(response.data);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/posts/${id}`);
      if (response.status === 200) {
        fetchPosts().then((response) => {
          setPosts(response.data);
        });
        toast.success("Xóa thành công!");
      }
    } catch (error) {
      toast.success("Đã xảy ra lỗi!");
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h1 className="h4">Post List</h1>
        <Link className="btn btn-primary" to={"/posts/create"}>
          Thêm mới
        </Link>
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Views</th>
              <th style={{ width: "200px" }}>Actions</th>
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
                <PostItem
                  key={item.id}
                  post={item}
                  handleDelete={handleDelete}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Posts;
