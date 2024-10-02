import { useState, useEffect } from "react";

const Stopwatch = () => {

	const [ running, setRunning ] = useState(false);
	const [ time, setTime ] = useState(0);

	useEffect( () => {
		
		let intervalId;
		if (running) 
		{
			intervalId = setInterval(() => {
				setTime((prevTime) => prevTime + 1);
				}, 1000);
		}
		

			return () => {
				clearInterval(intervalId);
			};
		}, [running] );

	const handleStartStop = () => {
		setRunning(!running);
	};
	
	const handleReset = () => {
	setTime(0);
	setRunning(false);
	};

	return (
		
		<>
		<center>
		<h2> Stop Watch </h2>
		<p> {time} seconds </p>
		<button onClick={handleStartStop}>{running ? 'Stop' : 'Start'}</button>
		<button onClick={handleReset}>Reset</button>
		</center>
		</>

	);
};

export default Stopwatch;