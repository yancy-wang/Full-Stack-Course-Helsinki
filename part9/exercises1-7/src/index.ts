import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { BmiResponse, ErrorResponse, ExerciseRequest, ExerciseResult } from './types';

const app = express();
app.use(express.json());

const PORT = 3003;

// Hello endpoint
app.get('/hello', (_req: Request, res: Response): void => {
  res.send('Hello Full Stack!');
});

// BMI endpoint
app.get('/bmi', (req: Request, res: Response): void => {
  const { height, weight } = req.query;

  // Validate parameters
  if (!height || !weight) {
    const errorResponse: ErrorResponse = { error: 'malformatted parameters' };
    res.status(400).json(errorResponse);
    return;
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (isNaN(heightNum) || isNaN(weightNum) || heightNum <= 0 || weightNum <= 0) {
    const errorResponse: ErrorResponse = { error: 'malformatted parameters' };
    res.status(400).json(errorResponse);
    return;
  }

  const bmi = calculateBmi(heightNum, weightNum);
  
  const response: BmiResponse = {
    weight: weightNum,
    height: heightNum,
    bmi
  };

  res.json(response);
});

// Exercise calculator endpoint
app.post('/exercises', (req: Request, res: Response): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const body: any = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!body || !body.daily_exercises || !body.target) {
    const errorResponse: ErrorResponse = { error: 'parameters missing' };
    res.status(400).json(errorResponse);
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const { daily_exercises, target }: ExerciseRequest = body;

  // Validate target
  const targetNum = Number(target);
  if (isNaN(targetNum) || targetNum <= 0) {
    const errorResponse: ErrorResponse = { error: 'malformatted parameters' };
    res.status(400).json(errorResponse);
    return;
  }

  // Validate daily_exercises
  if (!Array.isArray(daily_exercises) || daily_exercises.length === 0) {
    const errorResponse: ErrorResponse = { error: 'malformatted parameters' };
    res.status(400).json(errorResponse);
    return;
  }

  const dailyExercisesNums: number[] = [];
  for (const exercise of daily_exercises) {
    const exerciseNum = Number(exercise);
    if (isNaN(exerciseNum) || exerciseNum < 0) {
      const errorResponse: ErrorResponse = { error: 'malformatted parameters' };
      res.status(400).json(errorResponse);
      return;
    }
    dailyExercisesNums.push(exerciseNum);
  }

  const result: ExerciseResult = calculateExercises(dailyExercisesNums, targetNum);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});