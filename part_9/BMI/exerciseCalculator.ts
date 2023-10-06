type Rating = 1 | 2 | 3

type Message = 'abject failure' | 'bare minimum' | 'good job!'

type RatingPair = {rating: Rating, message: Message}

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
    const buffer = 1.25

    const exerciseRatings = [
        {lowerLimit: 0, upperLimit: target, rating: 1, message: 'abject failure'},
        {lowerLimit: target, upperLimit: target * buffer, rating: 2, message: 'bare minimum'},
        {lowerLimit: target * buffer, upperLimit: Infinity, rating: 3, message: 'good job!'}
    ]

    //default
    let pairOut = {rating: 99 as Rating, message: 'rating not loaded' as Message}

    exerciseRatings.forEach(i => {
        if (i.lowerLimit <= average && average < i.upperLimit) {
            pairOut = {rating: i.rating as Rating, message: i.message as Message}
        }
    })

    return pairOut

}

//helper function for calculating sum of array
const sum = (arr: number[]): number => {
    const thisSum = arr.reduce((accumulator, item) => {
        return item + accumulator
    }, 0)

    return thisSum
}

//note how ExerciseValues sets the type for the returned value
const calculateExercises = (exerciseLog: number[]): ExerciseValues => {
    //hard code for now
    const targetValue = 2
    
    const totalDays = exerciseLog.length
    const trainingDays = exerciseLog.filter(i => i > 0).length
    const averageTime = sum(exerciseLog)/totalDays

    const ratingPair = getRating(averageTime, targetValue)
    const targetReached = ratingPair.rating > 1 ? true : false


    return {
        totalDays: totalDays,
        trainingDays: trainingDays,
        targetValue: targetValue,
        averageTime: averageTime,
        targetReached: targetReached,
        rating: ratingPair.rating,
        message: ratingPair.message
    }
}


console.log(calculateExercises([-3, 0, 2, -4.5, 0, 3, 1]))