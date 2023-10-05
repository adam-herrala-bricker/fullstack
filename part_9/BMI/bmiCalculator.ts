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

const calculateBmi = (height: number, mass: number) => {
    const bmi = (mass)/((height/100)**2)
    console.log(bmi)
    let thisCategory = 'no BMI calculated'

    bmiCategories.forEach(i => {
        if (i.lowerLimit <= bmi && bmi < i.upperLimit) {
            
            thisCategory = i.category
        }
    })

    return thisCategory
}

console.log(calculateBmi(180, 74))

