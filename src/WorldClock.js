import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WorldClock.css";
const WorldClock = () => {
  const timezones = [
    { name: "Kolkata", timezone: "Asia/Kolkata" },
    { name: "New York", timezone: "America/New_York" },
    { name: "Pakistan", timezone: "Asia/Karachi" },
    { name: "China", timezone: "Asia/Shanghai" },
    { name: "Africa", timezone: "Africa/Lagos" },
    { name: "Dubai", timezone: "Asia/Dubai" }
  ];

  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [worldClocks, setWorldClocks] = useState([]);

  const handleTimezoneChange = (event) => {
    setSelectedTimezone(event.target.value);
  };

  const handleAddClock = () => {
    if (selectedTimezone) {
      setWorldClocks((prevClocks) => [
        ...prevClocks,
        {
          timezone: selectedTimezone,
          id: new Date().getTime()
        }
      ]);
      setSelectedTimezone("");
    }
  };

  const handleRemoveClock = (id) => {
    setWorldClocks((prevClocks) =>
      prevClocks.filter((clock) => clock.id !== id)
    );
  };

  return (
    <div className="world-clock-container">
      <h1>World Clock</h1>
      <select value={selectedTimezone} onChange={handleTimezoneChange}>
  <option value="">Select a Time-Zone</option>
  {timezones.map((timezone) => (
    <option key={timezone.timezone} value={timezone.timezone}>
      {timezone.name}
    </option>
  ))}
</select>

      <button onClick={handleAddClock}>Add Clock</button>
      <div className="world-clock-grid">
        {worldClocks.map((clock) => (
          <WorldClockDisplay
            key={clock.id}
            timezone={clock.timezone}
            onRemove={() => handleRemoveClock(clock.id)}
          />
        ))}
      </div>
    </div>
  );
};

const WorldClockDisplay = ({ timezone, onRemove }) => {
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [day, setDay] = useState(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get(
          `https://worldtimeapi.org/api/timezone/${timezone}`
        );
        const { datetime, day_of_week } = response.data;
        const [dateString, timeString] = datetime.split("T");
        const [year, month, day] = dateString.split("-");
        const [time, _] = timeString.split(".");
        const formattedTime = time.slice(0, 8);
        const formattedDate = `${day}/${month}/${year}`;
        const formattedDay = dayOfWeekToText(day_of_week);
        setTime(formattedTime);
        setDate(formattedDate);
        setDay(formattedDay);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchTime();

    const intervalId = setInterval(fetchTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timezone]);

  const dayOfWeekToText = (dayOfWeek) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayOfWeek];
  };
return (
  <div className="world-clock-tile">
    <h2>{timezone}</h2>
    {time && date && day ? (
      <div>
        <p className="clock-time">Time: {time}</p>
        <p className="clock-date">Date: {date}</p>
        <p className="clock-day">Day: {day}</p>
      </div>
    ) : (
      <p>Fetching time for you, please wait...</p>
    )}
    <button className="remove-button" onClick={onRemove}>
      Remove
    </button>
  </div>
);

};

export default WorldClock;