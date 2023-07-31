//function for sum of elements in array
const sum = (arr) => arr.reduce((total, current) => total + current, 0)

//function for pulling out exercise numbers from course object
const exerciseTotaler = (course) => {
  const exArr = course.parts.map((part) => part.exercises)
  return(sum(exArr))

}


const Course = ({course}) => {
  return( 
    <div>
      <h2>{course.name}</h2>
      <ul>
        {course.parts.map((part) => <li key = {part.id}>{part.name} {part.exercises}</li>)}
      </ul>
      <h4>total of {exerciseTotaler(course)} exercises</h4>
    </div>
  )
}

export default Course