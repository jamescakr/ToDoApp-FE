import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import api from "../utils/api";
import "../App.css";

const TodoItem = ({ item, getTasks }) => {
  const [deleteItem, setDeleteItem] = useState("");
  const [isComplete, setIsComplete] = useState(item.isComplete);

  const deleteTask = async () => {
    try {
      const response = await api.delete(`/tasks/${item._id}`);
      if (response.status === 200) {
        console.log("deleted!!");
        setDeleteItem("");
        getTasks();
      } else {
        throw new Error("task can not be deleted");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const updateTask = async () => {
    try {
      const response = await api.put(`tasks/${item._id}`, {
        isComplete: !isComplete,
      });
      if (response.status === 200) {
        console.log("updated!!");
        setIsComplete(!isComplete);
        getTasks();
      } else {
        throw new Error("task can not be updated");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className={`todo-content ${isComplete ? "completed" : ""}`}>{item.task}</div>

          <div>
            <button className="button-delete" onClick={deleteTask}>
              Delete
            </button>
            <button className="button-delete" onClick={updateTask}>
              {isComplete ? "Undo" : "Done"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
