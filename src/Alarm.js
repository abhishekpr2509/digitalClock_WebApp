import React, { useState, useEffect } from "react";

const Alarm = () => {
  const [alarmTime, setAlarmTime] = useState("");
  const [isAlarmSet, setIsAlarmSet] = useState(false);

  const handleAlarmTimeChange = (event) => {
    setAlarmTime(event.target.value);
  };

  const handleSetAlarm = () => {
    setIsAlarmSet(true);
  };

  const handleResetAlarm = () => {
    setIsAlarmSet(false);
  };

  useEffect(() => {
    const checkAlarm = () => {
      const currentTime = new Date();
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();

      const [alarmHours, alarmMinutes] = alarmTime.split(":");
      const parsedAlarmHours = parseInt(alarmHours, 10);
      const parsedAlarmMinutes = parseInt(alarmMinutes, 10);

      if (
        isAlarmSet &&
        currentHours === parsedAlarmHours &&
        currentMinutes === parsedAlarmMinutes
      ) {
        alert("Alarm is ringing!");
        setIsAlarmSet(false);
      }
    };

    const intervalId = setInterval(checkAlarm, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isAlarmSet, alarmTime]);

  return (
	<>
	<center>
	<h3>Set Alarm</h3>
	<input type="time" value={alarmTime} onChange={handleAlarmTimeChange} />
	<button onClick={handleSetAlarm}>Set</button>
	<button onClick={handleResetAlarm}>Reset</button>
	</center>
	</>
  );
};

export default Alarm;
