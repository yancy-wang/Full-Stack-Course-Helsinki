"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bmiCalculator_1 = require("./bmiCalculator");
const exerciseCalculator_1 = require("./exerciseCalculator");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3003;
// Hello endpoint
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});
// BMI endpoint
app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    // Validate parameters
    if (!height || !weight) {
        const errorResponse = { error: 'malformatted parameters' };
        res.status(400).json(errorResponse);
        return;
    }
    const heightNum = Number(height);
    const weightNum = Number(weight);
    if (isNaN(heightNum) || isNaN(weightNum) || heightNum <= 0 || weightNum <= 0) {
        const errorResponse = { error: 'malformatted parameters' };
        res.status(400).json(errorResponse);
        return;
    }
    const bmi = (0, bmiCalculator_1.calculateBmi)(heightNum, weightNum);
    const response = {
        weight: weightNum,
        height: heightNum,
        bmi
    };
    res.json(response);
});
// Exercise calculator endpoint
app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    const body = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!body || !body.daily_exercises || !body.target) {
        const errorResponse = { error: 'parameters missing' };
        res.status(400).json(errorResponse);
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const { daily_exercises, target } = body;
    // Validate target
    const targetNum = Number(target);
    if (isNaN(targetNum) || targetNum <= 0) {
        const errorResponse = { error: 'malformatted parameters' };
        res.status(400).json(errorResponse);
        return;
    }
    // Validate daily_exercises
    if (!Array.isArray(daily_exercises) || daily_exercises.length === 0) {
        const errorResponse = { error: 'malformatted parameters' };
        res.status(400).json(errorResponse);
        return;
    }
    const dailyExercisesNums = [];
    for (const exercise of daily_exercises) {
        const exerciseNum = Number(exercise);
        if (isNaN(exerciseNum) || exerciseNum < 0) {
            const errorResponse = { error: 'malformatted parameters' };
            res.status(400).json(errorResponse);
            return;
        }
        dailyExercisesNums.push(exerciseNum);
    }
    const result = (0, exerciseCalculator_1.calculateExercises)(dailyExercisesNums, targetNum);
    res.json(result);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
