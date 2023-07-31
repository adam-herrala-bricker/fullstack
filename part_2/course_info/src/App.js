
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
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map((part) => <li key = {part.id}>{part.name} {part.exercises}</li>)}
      </ul>
      <h4>total of {exerciseTotaler(course)} exercises</h4>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Fouth one for testing',
        exercises: 0,
        id: 4
      }
    ]
  }

  return (
  <Course course={course} />
  
  )
}
  

export default App