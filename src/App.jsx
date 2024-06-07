import { useState } from "react";
import "./App.css";

function App() {
	const [startVisible, setStartVisible] = useState(true);
	const [op1, setOp1] = useState(0);
	const [op2, setOp2] = useState(0);
	const [operation, setOperation] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const operations = ["+", "-", "*"];
	const [answer, setAnswer] = useState();

	const toggleStartVisible = () => {
		setStartVisible(!startVisible);
		generateOps();
		setRandomOperation();
	};

	const generateOps = () => {
		setOp1(Math.floor(Math.random() * 10) + 1);
		setOp2(Math.floor(Math.random() * 10) + 1);
	};

	const setRandomOperation = () => {
		setOperation(operations[Math.floor(Math.random() * operations.length)]);
	};

	const validateAnswer = () => {
		const result = eval(`${op1} ${operation} ${op2}`);
		toggleModal();
    parseInt(answer) === result ? setIsCorrect(true) : setIsCorrect(false);
    setAnswer("");
	};

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const reStartGame = () => {
		setOp1(Math.floor(Math.random() * 10) + 1);
		setOp2(Math.floor(Math.random() * 10) + 1);
		setOperation(operations[Math.floor(Math.random() * operations.length)]);
		setIsModalOpen(false);
		setIsCorrect(false);
	};

	const handleAnswererChange = (event) => {
		setAnswer(event.target.value);
	};

	return (
		<>
			<div className={`modal ${isModalOpen ? "visible" : "hidden"}`}>
				<div className="msgContainer">
					<div className={`correct ${isCorrect ? "visible" : "hidden"}`}>
						<p>Correcto</p>
						<button onClick={reStartGame}>Siguiente</button>
					</div>
					<div className={`incorrect ${isCorrect ? "hidden" : "visible"}`}>
						<p>Incorrecto</p>
						<button onClick={closeModal}>Intenta de nuevo</button>
					</div>
				</div>
			</div>
			<div className="header">
				<h1>Tamgram</h1>
				<p>
					<b>La aplicación para que practiques matemáticas todos los días</b>
				</p>
			</div>
			<main>
				<div className={`startMessage ${startVisible ? "visible" : "hidden"}`}>
					<p id="instructions">
						A continuación te aparecerán varias operaciones matemáticas, cuando
						sepas la respuesta ecríbela en el campo de respuesta y presiona el
						botón de validar.
					</p>
					<p>
						<b>Presiona el botón de abajo para comenzar</b>
					</p>
					<button onClick={toggleStartVisible}>Empezar</button>
				</div>
				<div className={`game ${startVisible ? "hidden" : "visible"}`}>
					<div className="gameContainer">
						<div className="op">{op1}</div>
						<div className="operation">{operation}</div>
						<div className="op">{op2}</div>
					</div>
					<div className="answerContainer">
						<input
							type="number"
							id="answer"
							onChange={handleAnswererChange}
							value={answer}
						/>
						<button onClick={validateAnswer}>Validar</button>
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
