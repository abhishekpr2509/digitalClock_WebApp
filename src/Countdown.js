import { useState, useEffect } from "react";

const Countdown = () => {
  const [targetDate, setTargetDate] = useState("");
  const [remainingTime, setRemainingTime] = useState("Please enter the target date and time");

  const handleTargetDateChange = (event) => {
    setTargetDate(event.target.value);
  };

  useEffect(() => {
    const calculateRemainingTime = () => {
      const currentTime = new Date().getTime();
      const difference = new Date(targetDate) - currentTime;

      if (isNaN(new Date(targetDate))) {
        setRemainingTime("Please enter a valid target date and time");
      } else if (difference <= 0) {
        
        setRemainingTime("Countdown complete!");
      } else {
        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };


    const intervalId = setInterval(calculateRemainingTime, 1000);


    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
	<>
	<center>
	<h3>Countdown</h3>
	<input type="datetime-local" value={targetDate} onChange={handleTargetDateChange} />
	<p>{remainingTime}</p>
	</center>
	</>
  );
};

export default Countdown;
