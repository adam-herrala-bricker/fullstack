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
const ShowStat = (props) => {
  return(
    <div>{props.text}{props.stat}</div>

  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //event handlers
  const clickGood = () => setGood(good + 1)
  const clickNeutral = () => setNeutral(neutral + 1)
  const clickBad = () => setBad(bad + 1)


  return (
    <div>
      <Title text='give feedback' />
      <Button click={clickGood} text ='good'/>
      <Button click={clickNeutral} text='neutral'/>
      <Button click={clickBad} text='bad'/>
      <Title text='statistics' />
      <ShowStat text='good ' stat={good} />
      <ShowStat text='neutral ' stat={neutral} />
      <ShowStat text='bad ' stat={bad} />
    </div>
  )
}

export default App