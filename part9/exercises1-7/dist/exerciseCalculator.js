"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateExercises = void 0;
const calculateExercises = (dailyExerciseHours, target) => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(day => day > 0).length;
    const totalHours = dailyExerciseHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= target;
    let rating;
    let ratingDescription;
    const ratio = average / target;
    if (ratio >= 1) {
        rating = 3;
        ratingDescription = 'excellent';
    }
    else if (ratio >= 0.75) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }
    else {
        rating = 1;
        ratingDescription = 'bad';
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};
exports.calculateExercises = calculateExercises;
const parseExerciseArguments = (args) => {
    if (args.length < 4)
        throw new Error('Not enough arguments');
    const target = Number(args[2]);
    if (isNaN(target) || target <= 0) {
        throw new Error('Target must be a positive number!');
    }
    const dailyHours = args.slice(3).map(arg => {
        const num = Number(arg);
        if (isNaN(num) || num < 0) {
            throw new Error('All exercise hours must be non-negative numbers!');
        }
        return num;
    });
    if (dailyHours.length === 0) {
        throw new Error('At least one day of exercise data is required!');
    }
    return { target, dailyHours };
};
if (require.main === module) {
    try {
        const { target, dailyHours } = parseExerciseArguments(process.argv);
        console.log((0, exports.calculateExercises)(dailyHours, target));
    }
    catch (error) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}
