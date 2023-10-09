type Rating = 1 | 2 | 3;

type Message = 'abject failure' | 'bare minimum' | 'good job!';

//pair of values that constitute the rating
interface RatingPair {
    rating: Rating, 
    message: Message
}

//input values
interface LogValues {
    target: number,
    exerciseLog: number[]
}

//output values
interface ExerciseValues {
    totalDays: number,
    trainingDays: number,
    targetValue: number,
    averageTime: number,
    targetReached: boolean,
    rating: Rating,
    message: Message
}

//helper function to return the correct rating (pass user's average hours, target average)
const getRating = (average: number, target: number): RatingPair => {
    //amount *target to get to a 3 rating
    const buffer = 1.25;

    const exerciseRatings = [
        {lowerLimit: 0, upperLimit: target, rating: 1, message: 'abject failure'},
        {lowerLimit: target, upperLimit: target * buffer, rating: 2, message: 'bare minimum'},
        {lowerLimit: target * buffer, upperLimit: Infinity, rating: 3, message: 'good job!'}
    ];

    let pairOut = null;
    
    exerciseRatings.forEach(i => {
        if (i.lowerLimit <= average && average < i.upperLimit) {
            pairOut = {rating: i.rating, message: i.message};
        }
    });

    if (pairOut) {
        return pairOut;
    } else {
        throw new Error('an unknown error has occured in computing the ratings');
    }
};

//helper function for calculating sum of array
const sum = (arr: number[]): number => {
    const thisSum = arr.reduce((accumulator, item) => {
        return item + accumulator;
    }, 0);

    return thisSum;
};

//function to calculate final output
//note how ExerciseValues sets the type for the returned value
export const calculateExercise = (exerciseLog: number[], targetValue: number): ExerciseValues => {
    
    const totalDays = exerciseLog.length;
    const trainingDays = exerciseLog.filter(i => i > 0).length;
    const averageTime = sum(exerciseLog)/totalDays;

    const ratingPair = getRating(averageTime, targetValue);
    const targetReached = ratingPair.rating > 1 ? true : false;


    return {
        totalDays: totalDays,
        trainingDays: trainingDays,
        targetValue: targetValue,
        averageTime: averageTime,
        targetReached: targetReached,
        rating: ratingPair.rating,
        message: ratingPair.message
    };
};

//helper function to check that all the passed values are (convertible to) numbers + are between 0 and 24 inclusive (since they denote hours in a day)
export const numberCheck = (arr: string[]): boolean => {
    const isHourNumber = arr.reduce((accumulator, item) => {
        return accumulator && !isNaN(Number(item)) && Number(item) >= 0 && Number(item) <= 24;
    }, true);

    return isHourNumber;
};

//function to parse args (unclear why this can't share the name of a function in a SEPERATE FILE)
const parseArgs2 = (args: string[]): LogValues => {
    //need at least 4 arguments
    if (args.length < 4) throw new Error('too few arguments');

    //everything is a number
    if (numberCheck(args.slice(2))) {
        return {
            target: Number(args[2]),
            exerciseLog: args.slice(3).map(i => Number(i))
        };
    } else {
        throw new Error('all entries must be numbers in range [0, 24]');
    }
};

//ouput to console
try {
    const {target, exerciseLog} = parseArgs2(process.argv);
    const output = calculateExercise(exerciseLog, target);
    console.log(output);
} catch (error: unknown) {
    let errorMessage = 'Indeterminate error';
    if (error instanceof Error) {
        errorMessage = 'Error: ' + error.message;
    }
    console.log(errorMessage);
}