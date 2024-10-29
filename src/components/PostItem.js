import { Popconfirm } from "antd";
import { useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

export const PostItem = ({ post, handleDelete }) => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigate();

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <tr>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.views}</td>
      <td className="text-center">
        <Popconfirm
          title="Thông báo"
          description="Bạn có muốn xóa hay không?"
          okText="Có"
          cancelText="Không"
          open={open}
          onConfirm={() => handleDelete(post.id)}
          onCancel={handleCancel}
        >
          <button className="btn btn-danger btn-sm" onClick={showPopconfirm}>
            Xóa
          </button>
        </Popconfirm>
        <button
          onClick={() => navigation(`/posts/${post.id}`)}
          className="mx-2 btn btn-info btn-sm"
        >
          Sửa
        </button>
      </td>
    </tr>
  );
};
