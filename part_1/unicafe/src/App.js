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

//component for displaying stats
const Statistics = (props) => {
  return(
    <div>{props.text}{props.stat}</div>

  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [responses, addResponse] = useState([])

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
      <Statistics text='good ' stat={good} />
      <Statistics text='neutral ' stat={neutral} />
      <Statistics text='bad ' stat={bad} />
      <Statistics text='all ' stat={responses.length} />
      <Statistics text='average ' stat={sum(responses)/responses.length} />
      <Statistics text='positive ' stat={percentPositive(responses)} />
    </div>
  )
}

export default App