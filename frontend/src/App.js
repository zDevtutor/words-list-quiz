import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Error404 from './pages/Error404';
import Practice from './pages/Practice';
import Rank from './pages/Rank';

function App() {
	const [score, setScore] = useState(0);

	const getScoreHandler = score => {
		setScore(score);
	};

	return (
		<>
			<Routes>
				<Route path='/' element={<Practice onGetScore={getScoreHandler} />} />
				<Route path='/rank' element={<Rank score={score} />} />
				<Route path='*' element={<Error404 />} />
			</Routes>
		</>
	);
}

export default App;
