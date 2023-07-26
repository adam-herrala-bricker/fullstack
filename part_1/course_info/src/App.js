const Header = (props) => {
  return(
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.part} {props.exes}</p>
    </div>
  )
}

const Content = (props) => {
  const p = props.course.parts
  return(
    <div>
      <Part part={p[0].name} exes={p[0].exercises}/>
      <Part part={p[1].name} exes={p[1].exercises}/>
      <Part part={p[2].name} exes={p[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  const p = props.course.parts
  return(
    <div>
      <p>Number of exercises {p[0].exercises + p[1].exercises + p[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
       name: 'Fundamentals of React',
       exercises: 10
     },
     {
       name: 'Using props to pass data',
       exercises: 7
     },
     {
       name: 'State of a component',
       exercises: 14
     }
   ]
  }
  

  return (
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </>
  )
}

export default App