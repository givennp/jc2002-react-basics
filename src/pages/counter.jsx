import { Box, Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";


const CounterPage = () => {
  const countSelector = useSelector((state) => state.counter);
  const [counterInput, setCounterInput] = useState("")


  const dispatch = useDispatch();

  const inputHandler = (event) => {
      const { value } = event.target

      setCounterInput(value)
  }

  const changeCountValue = (dir) => {
    if (dir === "increment") {
      dispatch({
        type: "INCREMENT_COUNTER",
      });
    } else if (dir === "decrement") {
      dispatch({
        type: "DECREMENT_COUNTER",
      });
    } else if (dir === "reset"){
        dispatch({
            type: "RESET_COUNTER"
        })
    }

};
const buttonHandler = () => {
  dispatch({
    type: "SET_COUNTER",
    payload: parseInt(counterInput),
  });
}

  return (
    <Box marginLeft="8">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Flex alignItems="center" marginTop="10">
          <Button onClick={() => changeCountValue("decrement")} marginRight="4">
            -
          </Button>
          <Text fontSize="2xl">{countSelector?.count}</Text>
          <Button onClick={() => changeCountValue("increment")} marginLeft="4">
            +
          </Button>
        </Flex>
        <Flex>
          <Input width="200px" marginTop="8" onChange={inputHandler}/>
          <Button marginTop="8" marginLeft="4" onClick={() => buttonHandler()}>
            Set Counter
          </Button>
          <Button onClick={() => changeCountValue("reset")} marginTop="8" marginLeft="3">RESET</Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default CounterPage;
