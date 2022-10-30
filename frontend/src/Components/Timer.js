import { Box } from "@mui/material";
import React from 'react';

const Timer = (props) => {
  return (
    <Box >
      <Box component={"span"}>
        {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
      </Box>
      <Box component={"span"}>
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
      </Box>
      <Box component={"span"}>
        {("0" + ((props.time / 10) % 100)).slice(-2)}
      </Box>
    </Box>
  );
};
export default Timer;
