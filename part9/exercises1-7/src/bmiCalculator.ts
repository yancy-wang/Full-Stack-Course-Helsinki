export const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
  
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'Normal range';
    } else if (bmi >= 25 && bmi < 30) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  };
  
  const parseArguments = (args: string[]): { height: number; weight: number } => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    const height = Number(args[2]);
    const weight = Number(args[3]);
  
    if (isNaN(height) || isNaN(weight)) {
      throw new Error('Provided values were not numbers!');
    }
  
    if (height <= 0 || weight <= 0) {
      throw new Error('Height and weight must be positive numbers!');
    }
  
    return { height, weight };
  };
  
  if (require.main === module) {
    try {
      const { height, weight } = parseArguments(process.argv);
      console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
      let errorMessage = 'Something bad happened.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      console.log(errorMessage);
    }
  }