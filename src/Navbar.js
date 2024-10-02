import { Link } from "react-router-dom";

export default function Navbar()
{
	return(
	<>
	<center>
		<div className="nav">
			<Link to="/"> Home </Link>
			<Link to="/WorldClock"> World Clock </Link>
			<Link to="/Stopwatch"> Stopwatch </Link>	
			<Link to="/Alarm"> Alarm </Link>
			<Link to="/Countdown"> Countdown </Link>
	</div>
	</center>
	</>
	);
}