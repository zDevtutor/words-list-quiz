import { useState, useEffect } from 'react';
import {
	Container,
	Button,
	Row,
	Col,
	Stack,
	Alert,
	ProgressBar,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Practice = props => {
	const [wordsList, setWordsList] = useState([{ id: '', word: '', pos: '' }]);
	const [error, setError] = useState('');
	const [counter, setCounter] = useState(0);
	const [result, setResult] = useState('');
	const [score, setScore] = useState(0);
	const [isFinished, setIsFinished] = useState(false);
	const navigate = useNavigate();

	const buttons = ['noun', 'adverb', 'adjective', 'verb'];
	const progress = counter * 10 + 10;

	const getAnswerHandler = event => {
		const userAnswer = event.target.id;

		if (userAnswer === wordsList[counter].pos) {
			setResult('correct');
			setScore(score + 10);
		} else {
			setResult('Incorrect');
		}

		if (counter === wordsList.length - 1) {
			setIsFinished(true);
		} else {
			setCounter(counter + 1);
		}
	};

	useEffect(() => {
		fetch('/words')
			.then(response => response.json())
			.then(data => {
				setWordsList(data);
			})
			.catch(err =>
				setError(
					'Somthing Went Wrong, Not Able to Fetch Data, Please Try Again'
				)
			);
	}, []);

	return (
		<Container className='mt-4'>
			<Row>
				<Col className='text-center'>
					<h1>WordList App</h1>
					{error ? (
						<Alert variant='danger' className='text-capitalize mt-4'>
							{error}
						</Alert>
					) : !isFinished ? (
						<>
							<ProgressBar
								now={progress}
								className='mt-4'
								label={`${progress}%`}
							/>
							<h2 className='text-capitalize mt-3'>
								{wordsList[counter].word}
							</h2>
							<span className='d-block mb-3'>Choose The correct Answer: </span>
							<Stack
								gap={3}
								direction='horizontal'
								className='justify-content-center'>
								{buttons.map(button => (
									<Button
										key={button}
										id={button}
										variant='primary'
										className='text-capitalize'
										onClick={getAnswerHandler}>
										{button}
									</Button>
								))}
							</Stack>
							{result && (
								<Alert
									variant={result === 'correct' ? 'success' : 'danger'}
									className='text-capitalize mt-4'>
									{result}
								</Alert>
							)}
						</>
					) : (
						<Button
							variant='primary'
							className='text-capitalize'
							onClick={() => {
								props.onGetScore(score);
								navigate('/rank');
							}}>
							View Results
						</Button>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default Practice;
