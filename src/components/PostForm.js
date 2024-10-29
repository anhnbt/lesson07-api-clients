import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../utils";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const PostForm = () => {
  let { postId } = useParams();
  console.log(postId);

  const [form, setForm] = useState({
    title: "",
    views: 0,
  });

  useEffect(() => {
    async function fetchPost() {
      const response = await axios.get(`${API_URL}/posts/${postId}`);
      console.log(response.data);
      setForm({
        ...response.data,
      });
    }

    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postId) {
      const response = await axios.post(`${API_URL}/posts`, {
        ...form,
      });
      console.log(response.data);
      if (response.status === 201) {
        setForm({
          ...form,
          title: "",
          views: 0,
        });
        toast.success("Thêm mới thành công!");
      }
    } else {
      const response = await axios.put(`${API_URL}/posts/${postId}`, {
        ...form,
      });
      console.log(response.data);
      if (response.status === 200) {
        setForm({
          ...form,
          title: "",
          views: 0,
        });
        toast.success("Cập nhật thành công!");
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">{postId ? 'Cập nhật' : 'Thêm mới'} sản phẩm</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input
              className="form-control"
              type="text"
              name="title"
              id="title"
              value={form.title}
              onChange={handleChange}
            />
            <div className="my-2">
              <label htmlFor="views">Views:</label>
              <input
                type="number"
                name="views"
                id="views"
                value={form.views}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {postId ? 'Cập nhật' : 'Thêm mới'}
            </button>
            <Link className="btn btn-link" to={"/posts"}>
              Quay lại
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
