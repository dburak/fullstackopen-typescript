interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  numberOfExercises: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  const target = Number(args[2]);
  const numberOfExercises = args.slice(3).map(Number);

  return {
    target,
    numberOfExercises,
  };
};

const calculateExercises = (
  numberOfExercises: number[],
  target: number
): Result => {
  const periodLength = numberOfExercises.length;

  let trainingDays = 0;
  let totalHours = 0;
  let rating;
  let ratingDescription;

  numberOfExercises.forEach((e) => {
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
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

try {
  const { target, numberOfExercises } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(numberOfExercises, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
