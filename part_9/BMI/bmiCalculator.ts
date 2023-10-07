//structured as [{lowerLimit : N, upperLimit: N, category: S}, ...]
const bmiCategories = [
    {lowerLimit : 0, upperLimit : 16, category : "Underweight (Severe thinness)"},
    {lowerLimit : 16, upperLimit : 17, category : "Underweight (Moderate thinness)"},
    {lowerLimit : 17, upperLimit : 18.5, category : "Underweight (Mild thinness)"},
    {lowerLimit : 18.5, upperLimit : 25, category : "Normal (Healthy weight)"},
    {lowerLimit : 25, upperLimit : 30, category : "Overweight (Pre-obese)"},
    {lowerLimit : 30, upperLimit : 35, category : "Obese (Class I)"},
    {lowerLimit : 35, upperLimit : 40, category : "Obese (Class II)"},
    {lowerLimit : 40, upperLimit : Infinity, category : "Obese (Class III)"}
]

interface BmiValues {
    height: number,
    weight: number
}

//get arguments from command line
const parseArgs = (args: string[]): BmiValues => {
    //check for incorrect number of arguments
    if (args.length < 4) throw new Error ('too few arguments')
    if (args.length > 4) throw new Error('too many arguments')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('height and weight must be numbers')
    }
}

export const calculateBmi = (height: number, mass: number): string => {
    const bmi = (mass)/((height/100)**2)
    let thisCategory = 'error'

    bmiCategories.forEach(i => {
        if (i.lowerLimit <= bmi && bmi < i.upperLimit) {
            
            thisCategory = i.category
        }
    })

    return thisCategory
   
}

//output to console
if (require.main === module) { // only do this if run directly
    try {
        const { height, weight } = parseArgs(process.argv)
        const thisBmi = calculateBmi(height, weight)
        console.log(thisBmi)
    } catch (error : unknown) {
        let errorMessage = 'Indeterminate error'
        if (error instanceof Error) {
            errorMessage = 'Error: ' + error.message
        }
        console.log(errorMessage)
    }
}


