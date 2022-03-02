import { useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button, Input } from "reactstrap";
import moment from "moment";
import { FaProductHunt } from "react-icons/fa";

const TodoItem = (props) => {
  return (
    <Card className="my-2">
      <CardBody>
        <div className="d-flex justify-content-between">
          <div>
            <CardTitle tag="h5" className="fw-bold">
              {moment(props.date).format("DD MMM YYYY")}
            </CardTitle>
            <CardText>{props.action}</CardText>
          </div>
          <div>
            {props.status ? (
              <Button onClick={props.editItem} color="success">
                {" "}
                Done{" "}
              </Button>
            ) : (
              <Button onClick={props.editItem} color="danger">
                On Going
              </Button>
            )}
            <Button className="ms-2" onClick={props.deleteItem}>
              Delete
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TodoItem;
