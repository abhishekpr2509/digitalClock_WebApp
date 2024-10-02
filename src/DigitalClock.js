import Stopwatch from "./Stopwatch";
import WorldClock from "./WorldClock";
import { useState, useEffect } from "react";
export default function DigitalClock()
{
	const [time, setTime] = useState(new Date());

	useEffect(()=> {
	
		const timer = setInterval(() => {
			setTime(new Date());
		},1000);
	return () => {
		clearInterval(timer);
		};
	}, [] );

	return(
	
	<>
	<center>
	<h1> Digital Clock App </h1>
	<p>{ time.toLocaleTimeString() } </p>
	</center>
	</>
	
	
	);
};