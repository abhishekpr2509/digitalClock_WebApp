import logo from './logo.svg';
import './App.css';
import DigitalClock from "./DigitalClock";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorldClock from "./WorldClock";
import Stopwatch from "./Stopwatch";
import Navbar from "./Navbar";
import Alarm from "./Alarm";
import Countdown from "./Countdown";

function App() {
  return (
    <div className="App">
	<BrowserRouter>
		<Navbar/>
		<Routes>
			<Route path="/" element={<DigitalClock/>}/>
			<Route path="/WorldClock" element={<WorldClock/>}/>
			<Route path="/Stopwatch" element={<Stopwatch/>}/>
			<Route path="/Alarm" element={<Alarm/>}/>
			<Route path="/Countdown" element={<Countdown/>}/>
			<Route path="*" element={<DigitalClock/>}/>
		</Routes>
    	</BrowserRouter>
	</div>
  );
}

export default App;
