import { Box, Button, Card, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import ActionButtons from "./ActionButtons";
import Timer from "./Timer";
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';


const StopWatch = () => {
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(true);
  const [time, setTime] = useState(0);
  const [savedTime, setSavedTime] = useState([]);

  useEffect(() => {
    let interval = null;

    if (start && stop === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [start, stop]);

  const handleStart = () => {
    setStart(true);
    setStop(false);
  };

  const handlePauseResume = () => {
    setStop(!stop);
    console.log(time);
  };

  const handleReset = () => {
    setStart(false);
    setTime(0);
  };

  const convertTime = (stopTime) => {
    let miliSeconds = (stopTime / 10).toString();
    let minutes = (stopTime / 1000 / 60).toString();
    let seconds = ((stopTime / 1000) % 60).toString();

    if (stopTime < 1000) {
      return "00:00." + miliSeconds;
    } else if (miliSeconds.length === 3) {
      return (
        "00:0" + seconds.substring(0, 1) + "." + miliSeconds.substring(1, 3)
      );
    } else if (miliSeconds.length === 4 && parseInt(miliSeconds) < 6000) {
      return (
        "00:" + miliSeconds.substring(0, 2) + "." + miliSeconds.substring(2, 4)
      );
    } else if (
      (miliSeconds.length === 5 && parseInt(miliSeconds) < 60000) ||
      miliSeconds > 6000
    ) {
      if (seconds.indexOf(".") === 1) {
        return (
          "0" +
          minutes.substring(0, 1) +
          ":0" +
          seconds.substring(0, 1) +
          "." +
          seconds.substring(3, 5)
        );
      } else {
        return (
          "0" +
          minutes.substring(0, 1) +
          ":" +
          seconds.substring(0, 2) +
          "." +
          seconds.substring(3, 5)
        );
      }
    } else {
      if (seconds.indexOf(".") === 1) {
        return (
          minutes.substring(0, 2) +
          ":0" +
          seconds.substring(0, 1) +
          "." +
          seconds.substring(3, 5)
        );
      } else {
        return (
          minutes.substring(0, 1) +
          ":" +
          seconds.substring(0, 2) +
          "." +
          seconds.substring(3, 5)
        );
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:3001/time/");
      const jsonResult = await result.json();

      setSavedTime(jsonResult);
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    const data = {
      time: time,
    };

    if(data.time !== 0) {
    const result = await fetch("http://localhost:3001/time/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resultJson = await result.json();
    setSavedTime((prev) => [...prev, resultJson]);
  } else {
    alert("Du kan inte spara innan du startat")
  }
  };

 
 const handleDelete = async (id) => {

 await fetch(`http://localhost:3001/time/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  setSavedTime(savedTime.filter(time => time.id !== id))
};
 


  return (
   <Box sx={{
    maxWidth: 500,
    padding: 2,
    margin: "auto",
    borderRadius: 8,
    backgroundColor: "black",
    mt:2
   }}>
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: 10,
        flexWrap: "wrap",
        maxWidth: 500,
        padding: 2,
        margin: "auto",
        backgroundColor: "rgba(209, 220, 205, 0.81)",
        borderRadius: 8,
      }}
    >
      <Card
        sx={{
          display: "flex",
          fontSize: 36,
          fontWeight: "bold",
          justifyContent: "center",
          bgColor: "rgba(232, 243, 226, 0)",
          borderRadius: 4,
          padding: 1,
          width: 300,
        }}
      >
        <Timer time={time} />
      </Card>

      <Box sx={{}}>
        <ActionButtons
          start={start}
          stop={stop}
          handleStart={handleStart}
          handlePauseResume={handlePauseResume}
          handleReset={handleReset}
          handleSave={handleSave}
        />
      </Box>

      <Box sx={{
        fontFamily:"sans-serif",
        fontSize:18,
        mt: 2,
        textAlign:"center"
      }}>
      
        
        {savedTime.map((time) => (
          <Box key={time.id} >
            <Divider width={400}   />
            <Box>{convertTime(time.time)}
            <Button onClick={ () => handleDelete(time.id)}>
            <DeleteIcon />
            </Button>
            </Box>
           
            <Box/>
          </Box>
        ))}
      </Box>
    </Card>
    </Box>
  );
};

export default StopWatch;
