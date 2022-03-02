import { useState } from "react";
import "./assets/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BandSection from "./components/BandSection/BandSection";
import Navbar from "./components/Navbar/Navbar";
import TourSection from "./components/TourSection/TourSection";
import ClassComponent from "./components/ClassComponent/ClassComponent";
import ContentCard from "./components/ContentCard/ContentCard";
import TodoItem from "./components/TodoItem/TodoItem";
import { Button, Input } from "reactstrap";

const data = [
  {
    username: "mark",
    location: "BSD",
    numberOfLikes: 123,
    caption: "Halo kawan-kawan!",
  },
  {
    username: "seto",
    location: "jakarta",
    numberOfLikes: 23,
    caption: "semangat2 oke2!",
  },
  {
    username: "bill",
    location: "rumah ayang",
    numberOfLikes: 123,
    caption: "sore2",
  },
];

function App() {
  const [myUsername, setMyUserName] = useState("seto");

  const renderContentList = () => {
    return data.map((val) => {
      return (
        <ContentCard
          username={val.username}
          location={val.location}
          numberOfLikes={val.numberOfLikes}
          caption={val.caption}
        />
      );
    });
  };

  const renderTodoList = () => {
    return todoList.map((val, index) => {
      return (
        <TodoItem
          date={val.date}
          action={val.action}
          status={val.status}
          deleteItem={() => deleteItem(index)}
          editItem = {()=> edit(index)}
        />
      );
    });
  };

  const changeStatus = () => {
    setMyUserName("bill");
  };

  const [todoInputValue, setTodoInputValue] = useState("");
  const [date, setDate] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [todoList, setTodoList] = useState([
    {
      date: new Date(),
      action: "belajar programming",
      status: true,
    },
    {
      date: new Date(),
      action: "belajar korup",
      status: false,
    },
    {
      date: new Date(),
      action: "belajar programming",
      status: true,
    },
    {
      date: new Date(),
      action: "belajar nyolong",
      status: false,
    },
  ]);

  const edit = (index) => {
    const newTodoArray = [...todoList];

    newTodoArray[index].status = !newTodoArray[index].status;

    setTodoList(newTodoArray);
  }

  const inputHandler = (event) => {
    const { value } = event.target;
    setTodoInputValue(value);
  };

  const dateHandler = (event) => {
    const { value } = event.target;
    setDate(value);
  };

  const statusHandler = (event) => {
    const { value } = event.target;
    setStatusValue(value);
  };

  const addTodoItem = () => {
    const newTodoArray = [...todoList];

    newTodoArray.push({
      date: date,
      action: todoInputValue,
      status: statusValue,
    });

    setTodoList(newTodoArray);
  };

  const deleteItem = (index) => {
    const newTodoArray = [...todoList];

    newTodoArray.splice(index,1)

    setTodoList(newTodoArray)
  };

  return (
    <>
      <div className="container">
        <div className="row my-3">
          <div className="offset-3 col-5">
            <Input onChange={inputHandler} />
            <Input className="mt-2" onChange={dateHandler} type="date" />
            <Input onChange={statusHandler} className="mt-2" type="select">
              <option>-</option>
              <option value={true}>done</option>
              <option value={false}>On Going</option>
            </Input>
          </div>{" "}
          <div className="col-2">
            <Button onClick={addTodoItem} color="success">
              {" "}
              Add Todo{" "}
            </Button>{" "}
          </div>
        </div>{" "}
        <div className="row">
          <div className="col-6 offset-3"> {renderTodoList()} </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}

export default App;
