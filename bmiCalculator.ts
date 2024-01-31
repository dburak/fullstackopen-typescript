interface BmiValues {
  value1: number;
  value2: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

// BMI = weight / height^2
const calculateBmi = (height: number, weight: number): string => {
  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    throw new Error(
      'Invalid input. Height and weight must be positive numbers.'
    );
  }

  const bmi = weight / Math.pow(height / 100, 2);

  if (isNaN(bmi)) {
    throw new Error(
      'Invalid BMI calculation. Please check your height and weight values.'
    );
  }

  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal (healthy weight)';
  if (bmi < 30) return 'Overweight';

  return 'Obese';
};

try {
  const { value1, value2 } = parseBmiArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
