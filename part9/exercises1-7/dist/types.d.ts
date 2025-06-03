export interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
export interface BmiResponse {
    weight: number;
    height: number;
    bmi: string;
}
export interface ExerciseRequest {
    daily_exercises: number[];
    target: number;
}
export interface ErrorResponse {
    error: string;
}
