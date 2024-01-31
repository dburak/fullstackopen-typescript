/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight)
    return res.status(400).json({ error: 'malformatted parameters' });

  const bmi = Number(weight) / Math.pow(Number(height) / 100, 2);

  let bmiCategory;

  if (bmi < 18.5) bmiCategory = 'Underweight';
  else if (bmi < 25) bmiCategory = 'Normal (healthy weight)';
  else if (bmi < 30) bmiCategory = 'Overweight';
  else bmiCategory = 'Obese';

  return res.status(200).json({
    weight,
    height,
    bmiCategory,
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const periodLength = daily_exercises.length;

  let trainingDays = 0;
  let totalHours = 0;
  let rating;
  let ratingDescription;

  daily_exercises.forEach((e: number) => {
    totalHours += e;

    e > 0 ? trainingDays++ : null;
  });

  const average = totalHours / periodLength;
  const success = average > target ? true : false;

  if (average > target) {
    rating = 3;
    ratingDescription = 'You are doing great!';
  } else if (average > target - 1) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you are far from the your target';
  }

  return res.send({
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
