import React, { useEffect, useState, useRef } from 'react'
import './BoardSolver.css'
import ColorElement from './ColorElement/ColorElement';
import AlertMessage from './AlertMessage/AlertMessage'

export default function BoardSolver(props) {

	useEffect(() => {
		props.setIsBoard(1);
	})

	let tracePathDelay = 200;
	let size = props.boardSize;
	let val = (props.boardSize === 4 ? "four" :
		(props.boardSize === 5 ? "five" :
			(props.boardSize === 6 ? "six" : "unknown")));

	// References to the color elements
	const colorElements = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)
		, useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)
		, useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)
		, useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)
		, useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)
		, useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)
		, useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)
		, useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)
		, useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

	// The color selected
	const [currentColor, setCurrentColor] = useState("red");

	// Maintaining the frequency of the colors to avoid frequency more than 2
	const [freqOfColor, setFreqOfColor] = useState(new Map([
		["red", 0],
		["yellow", 0],
		["blue", 0],
		["green", 0],
		["orange", 0],
		["cyan", 0],
		["pink", 0],
		["lightgreen", 0],
		["lightblue", 0]
	]));

	// Coordinates of the colors present on the puzzle grid
	// Unit of coord is ID
	const [coord, setCoord] = useState(new Map([
		["red", []],
		["yellow", []],
		["blue", []],
		["green", []],
		["orange", []],
		["cyan", []],
		["pink", []],
		["lightgreen", []],
		["lightblue", []]
	]))

	if (val === "unknown") {
		val = "five";
		size = 5;
	}

	// Main clear state
	const [mainClear, setMainClear] = useState(0);

	// Disable Solve Button
	const [disableSolve, setDisableSolve] = useState(0);

	// Disable Clear Button
	const [disableClear, setDisableClear] = useState(0);

	// Ids for color elements in the grid
	let four = [];
	for (let i = 0; i < 16; i++) {
		four.push(i);
	}

	let five = [];
	for (let i = 16; i < 25; i++) {
		five.push(i);
	}

	let six = [];
	for (let i = 25; i < 36; i++) {
		six.push(i);
	}

	let grid = [[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1]];

	let colorCodeToColor = new Map([
		["W", "white"],
		["R", "red"],
		["Y", "yellow"],
		["B", "blue"],
		["G", "green"],
		["O", "orange"],
		["C", "cyan"],
		["P", "pink"],
		["L", "lightgreen"],
		["Z", "lightblue"]
	]);

	let colorToColorCode = new Map([
		["white", 0],
		["red", 1],
		["yellow", 2],
		["blue", 3],
		["green", 4],
		["orange", 5],
		["cyan", 6],
		["pink", 7],
		["lightgreen", 8],
		["lightblue", 9]
	]);

	// Starts Solving the puzzle  
	function main() {
		setDisableClear(1);
		props.setGoToBoard(false);
		props.setGoToAbout(false);
		props.setGoToHome(false);

		coord.forEach((coordinateId, color) => {
			if (coordinateId.length === 2) {
				let startId = coordinateId[0], endId = coordinateId[1];

				let startX = Math.floor(startId / size);
				let startY = startId % size;

				let endX = Math.floor(endId / size);
				let endY = endId % size;

				let colorCode = colorToColorCode.get(color);

				grid[startX][startY] = colorCode;
				grid[endX][endY] = colorCode;
			}
		});

		fetch("http://localhost:8000/", {
			method: "POST",
			headers: {
				'Content-Type': "application/json"
			},
			body: JSON.stringify({
				size: size,
				grid: grid
			})
		}).then((res) => {
			return res.json();
		}).then((data) => {
			let solution = data.solution;

			if (solution[0] === "-") {
				props.showAlert(
					"Could not find the solution to the given puzzle",
					"primary",
					1
				);

				setDisableClear(0);
				props.setGoToBoard(true);
				props.setGoToAbout(true);
				props.setGoToHome(true);
				return;
			}

			let visitedInOrder = [];
			for (let ind = 0; ind < solution.length; ind += 5) {
				let id = parseInt(solution[ind] + "" + solution[ind + 1]);
				visitedInOrder.push([id, solution[ind + 2]]);
			}

			props.showAlert(
				"Puzzle is solved as follows!",
				"success",
				1
			);

			setTimeout(() => {
				props.showAlert(
					"Click on Clear to clear the board!",
					"primary",
					0
				);
			}, 3000);

			// Display the solution if it exists
			for (let i = 0; i < visitedInOrder.length; i++) {
				setTimeout(() => {
					if (colorElements[visitedInOrder[i][0]] != null) {
						colorElements[visitedInOrder[i][0]].current.style.backgroundColor = `${colorCodeToColor.get(visitedInOrder[i][1])}`;
					}
				}, tracePathDelay * (i + 1))
			}

			setTimeout(() => {
				setDisableClear(0);
				props.setGoToBoard(true);
				props.setGoToAbout(true);
				props.setGoToHome(true);
			}, tracePathDelay * (size * size))
		}).catch((err) => {
			setTimeout(() => {
				props.showAlert(
					"Unable to connect to the server.",
					"danger",
					1
				);
			}, 3000);
			setDisableClear(0);
			props.setGoToBoard(true);
			props.setGoToAbout(true);
			props.setGoToHome(true);
		})
	}

	// ----------------------------------------------- React Component ----------------------------------------------- //

	return (
		<>
			<main className="main">
				<div className="alertControl">
					<AlertMessage alert={props.alert}></AlertMessage>
				</div>

				<div className="middleContent">
					<div id={val} className="board">
						{
							four.map((value, index) => {
								return <ColorElement reference={colorElements[value]} key={index} id={value} mainClear={mainClear} disableSolve={disableSolve} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
							})
						}

						{
							five.map((value, index) => {
								return <ColorElement reference={colorElements[value]} key={index} id={value} mainClear={mainClear} disableSolve={disableSolve} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
							})
						}

						{
							six.map((value, index) => {
								return <ColorElement reference={colorElements[value]} key={index} id={value} mainClear={mainClear} disableSolve={disableSolve} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
							})
						}
					</div>

					<div className="options">
						<input onClick={() => setCurrentColor("red")} type="radio" className="btn-check" name="btnradio" id="red" autoComplete="off" defaultChecked />
						<label id="redLabel" className="option" htmlFor="red"></label>

						<input onClick={() => setCurrentColor("yellow")} type="radio" className="btn-check" name="btnradio" id="yellow" autoComplete="off" />
						<label id="yellowLabel" className="option" htmlFor="yellow"></label>

						<input onClick={() => setCurrentColor("blue")} type="radio" className="btn-check" name="btnradio" id="blue" autoComplete="off" />
						<label id="blueLabel" className="option" htmlFor="blue"></label>

						<input onClick={() => setCurrentColor("green")} type="radio" className="btn-check" name="btnradio" id="green" autoComplete="off" />
						<label id="greenLabel" className="option" htmlFor="green"></label>

						<input onClick={() => setCurrentColor("orange")} type="radio" className="btn-check" name="btnradio" id="orange" autoComplete="off" />
						<label id="orangeLabel" className="option" htmlFor="orange"></label>

						<input onClick={() => setCurrentColor("cyan")} type="radio" className="btn-check" name="btnradio" id="cyan" autoComplete="off" />
						<label id="cyanLabel" className="option" htmlFor="cyan"></label>

						<input onClick={() => setCurrentColor("pink")} type="radio" className="btn-check" name="btnradio" id="pink" autoComplete="off" />
						<label id="pinkLabel" className="option" htmlFor="pink"></label>

						<input onClick={() => setCurrentColor("lightgreen")} type="radio" className="btn-check" name="btnradio" id="lightgreen" autoComplete="off" />
						<label id="lightgreenLabel" className="option" htmlFor="lightgreen"></label>

						<input onClick={() => setCurrentColor("lightblue")} type="radio" className="btn-check" name="btnradio" id="lightblue" autoComplete="off" />
						<label id="lightblueLabel" className="option" htmlFor="lightblue"></label>
					</div>

				</div>

				<div className="actionButtons">
					<button id="solve" type="button" disabled={disableSolve} className="btn btn-outline-primary" onClick={() => {
						let solve = true;
						let count = 0;

						coord.forEach((coordinateId) => {
							if (coordinateId.length % 2) {
								solve = false;
							}
							count += coordinateId.length;
						});

						if (solve && count) {
							setDisableSolve(1);

							// Starts solving the puzzle
							main();
						} else {
							props.showAlert(
								"Enter valid color configuration",
								"warning",
								1
							);
						}
					}}>
						Solve!
					</button>

					<button disabled={disableClear} id="clear" type="button" className="btn btn-outline-primary" onClick={() => {
						props.showAlert(
							"Select two position for any color that you pick and lets see if a solution exists in which entire board can be filled connecting two ends of a color!",
							"primary",
							1
						);

						setDisableSolve(0);

						setCoord(new Map([
							["red", []],
							["yellow", []],
							["blue", []],
							["green", []],
							["orange", []],
							["cyan", []],
							["pink", []],
							["lightgreen", []],
							["lightblue", []]
						]));
						setFreqOfColor(new Map([
							["red", 0],
							["yellow", 0],
							["blue", 0],
							["green", 0],
							["orange", 0],
							["cyan", 0],
							["pink", 0],
							["lightgreen", 0],
							["lightblue", 0]
						]));

						setMainClear(mainClear ^ 1);
						for (let i = 0; i < size * size; i++) {
							colorElements[i].current.style.backgroundColor = "#838383";
						}

						grid = [[-1, -1, -1, -1, -1, -1],
						[-1, -1, -1, -1, -1, -1],
						[-1, -1, -1, -1, -1, -1],
						[-1, -1, -1, -1, -1, -1],
						[-1, -1, -1, -1, -1, -1],
						[-1, -1, -1, -1, -1, -1]];
					}}>Clear</button>
				</div>
			</main>
		</>
	)
}
