const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'data', 'TestData.json');

app.get('/', (req, res) => {
	res.send('<h1>App Is Running on Port 5000</h1>');
});

app.get('/words', (req, res) => {
	fs.readFile(dataPath, (err, fileContent) => {
		const data = JSON.parse(fileContent);
		const wordList = data.wordList;

		// Generate an object of 4 categories and each category has its own items.
		const wordItems = wordList.reduce(
			(prevValue, currValue, currIndex, array) => {
				prevValue[currValue.pos] = array.filter(
					item => item.pos === currValue.pos
				);

				return prevValue;
			},
			{}
		);

		const randomAdverb = [...wordItems.adverb]
			.sort(() => 0.5 - Math.random())
			.slice(0, 1);
		const randomVerb = [...wordItems.verb]
			.sort(() => 0.5 - Math.random())
			.slice(0, 3);
		const randomNoun = [...wordItems.noun]
			.sort(() => 0.5 - Math.random())
			.slice(0, 3);
		const randomAdjective = [...wordItems.adjective]
			.sort(() => 0.5 - Math.random())
			.slice(0, 3);

		const randomList = [
			...randomAdverb,
			...randomVerb,
			...randomNoun,
			...randomAdjective,
		];

		res.status(200).json(randomList);
	});
});

app.post('/rank', (req, res) => {
	const { score } = req.body;

	fs.readFile(dataPath, (err, fileContent) => {
		const data = JSON.parse(fileContent);
		const scoreList = data.scoresList;
		let rank = 0;
		let userRank;

		scoreList.forEach(scoreItem => {
			if (scoreItem < score) {
				rank++;
			}
		});

		userRank = ((rank / scoreList.length) * 100).toFixed(2);

		res.json({ userRank });
	});
});

app.use('/', (req, res) => {
	res.status(404).send('<h1>Route Not Found</h1>');
});

app.listen(5000, console.log('Server is running on PORT 5000'));
