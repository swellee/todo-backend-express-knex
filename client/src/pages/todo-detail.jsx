import React from "react";
import { fetchData, getToken } from "../ajax";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./todo-detail.css";
function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const { data: todo } = useRequest(
    async () => {
      const res = await fetchData(`/todo/${id}`);
      setTitle(res.title);
      setContent(res.content);
      return res;
    },
    { ready: !!id }
  );
  const onSave = async () => {
    await fetchData(`/todo/${id}`, {
      method: "patch",
      data: {
        title,
        content,
      },
    });
  }
  const onMark = async () => {
    await fetchData(`/todo/${id}`, {
      method: "patch",
      data: {
        completed: true,
      },
    });
  }

  const onChgTitle = (e) => {
    setTitle(e.target.value);
  }
  const onChgContent = (e) => {
    setContent(e.target.value);
  }
  return (
    <div className="todo-detail">
      <h1>Todo Detail</h1>
      <label className="title">Title:</label>
      <input type="text" value={title} onChange={onChgTitle} />
      <label className="content">Content:</label>
      <textarea className="content" rows={5} value={content} onChange={onChgContent}/>
      <div className="actions">
        <button onClick={onSave}>Save</button>
        <button onClick={onMark}>mark completed</button>
        <button onClick={goBack}>Go back</button>
      </div>
    </div>
  );
}
export default TodoDetail;
