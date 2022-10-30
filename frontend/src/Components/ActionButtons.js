import Button from "@mui/material/Button";
import { Box, Stack } from "@mui/material";
import React from 'react';


const ActionButtons = (props) => {
  const StartButton = (
    <Button
      sx={{
        bgcolor: "rgba(19, 160, 7, 1)",
        ":hover": { bgcolor: "rgb(19, 120, 7, 1)" },
      }}
      variant="contained"
      id="startTimer"
      onClick={props.handleStart}
    >
      Start
    </Button>
  );

  const ActiveButton = (
    <Button
      sx={{
        ":hover": { bgcolor: "rgba(160, 7, 7, 1)" },
      }}
      style={{ backgroundColor: props.stop ? "rgba(19, 160, 7, 1)" : "red" }}
      variant="contained"
      onClick={props.handlePauseResume}
    >
      {props.stop ? "RESUME" : "STOP"}
    </Button>
  );

  return (
    <Box>
      <Stack marginTop={2} direction={"row"} spacing={2}>
        {props.start ? ActiveButton : StartButton}

        <Button
          sx={{ bgcolor: "rgba(69, 74, 68, 1)" }}
          variant="contained"
          id="stopTimer"
          onClick={props.handleReset}
        >
          RESET
        </Button>
      </Stack>

      <Box
        sx={{
          mt:1,
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          id="save"
          sx={{
            width: "175px",
          }}
          onClick={props.handleSave}
        >
          SAVE
        </Button>
      </Box>
    </Box>
  );
};

export default ActionButtons;
