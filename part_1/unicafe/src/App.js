import { useState } from 'react'

//component for title text
const Title = (props) => {
  return(
    <h1>{props.text}</h1>
  )
}

//component for buttons
const Button = (props) => {
  return(
    <button onClick={props.click}>{props.text}</button>
  )
}

//component for single lines of stats
const StatsLine = (props) => {
  return(
  <div>{props.text}{props.stat}</div>
  )
}


//component for displaying all stats
const Statistics = (props) => {
  console.log(props.responses.length)
 
  //stats functions (idk if JS has these built in??)
  const sum = (arr) => {
    return arr.reduce((total, current) => {
      return total + current;
    }, 0);
  }
  const percentPositive = (arr) => {
    return(
      100*(arr.filter(entry => entry === 1).length/arr.length) + ' %'
      )
  }
  
  //check whether there are stats to display, only attempt to render if yes
  if (props.responses.length === 0) {
    return(
      <div>No feedback given</div>
    )
  }
  return(
    <div>
      <StatsLine text='good ' stat={props.responses.filter(entry => entry === 1).length}/>
      <StatsLine text='neutral ' stat={props.responses.filter(entry => entry === 0).length}/>
      <StatsLine text='bad ' stat={props.responses.filter(entry => entry === -1).length} />
      <StatsLine text='all ' stat={props.responses.length} />
      <StatsLine text='average ' stat={sum(props.responses)/props.responses.length} />
      <StatsLine text='positive ' stat={percentPositive(props.responses)} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [responses, addResponse] = useState([])

  //event handlers
  const clickGood = () => {
      setGood(good + 1)
      addResponse(responses.concat(1))
  }
  const clickNeutral = () => {
    setNeutral(neutral + 1)
    addResponse(responses.concat(0))
  }
  const clickBad = () => {
    setBad(bad + 1)
    addResponse(responses.concat(-1))
  }


  return (
    <div>
      <Title text='give feedback' />
      <Button click={clickGood} text ='good'/>
      <Button click={clickNeutral} text='neutral'/>
      <Button click={clickBad} text='bad'/>
      <Title text='statistics' />
      <Statistics responses={responses} />
  
    </div>
  )
}

export default App