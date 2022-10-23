import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap';

const Rank = ({ score }) => {
	const navigate = useNavigate();
	const [rank, setRank] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		fetch('/rank', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ score }),
		})
			.then(response => response.json())
			.then(data => setRank(data.userRank))
			.catch(error => {
				setError('Somthing Went Wrong');
			});
	}, [score]);

	return (
		<Container className='mt-4 text-center'>
			{error ? (
				<Alert variant='danger' className='text-capitalize mt-4'>
					{error}
				</Alert>
			) : (
				<h1>Your Rank: {rank} %</h1>
			)}

			<Button
				variant='primary'
				className='text-capitalize'
				onClick={() => navigate('/')}>
				Try Again
			</Button>
		</Container>
	);
};

export default Rank;
