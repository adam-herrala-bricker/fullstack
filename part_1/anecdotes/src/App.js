import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.click}>{props.text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    '90% of software engineers only understand 10% of the meaning of "anecdote."',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [shownAnecdotes, setShownAnecdotes] = useState([]) //want to avoid repeats before every one has been shown

  //helper functions
  const randomInt = (max) => {
    return(
      Math.floor(Math.random() * max)
    )
  }

  //event handlers
  const clickNext = () => {
    let thisRandom = randomInt(anecdotes.length)
    //seen them all --> reset for another round
    if (shownAnecdotes.length === anecdotes.length) { 
      return(
        setSelected(thisRandom),
        setShownAnecdotes([])
      )
    } else {
      //haven't seen them all --> keep generating randoms until we get a new one
      while (shownAnecdotes.includes(thisRandom)) {
        thisRandom = randomInt(anecdotes.length)
        console.log('random int:', thisRandom)
      }
      return(
        setSelected(thisRandom),
        setShownAnecdotes(shownAnecdotes.concat(thisRandom))
        )
      }
  }

  return (
    <div>
      {anecdotes[selected]}
      <p></p>
      <Button text='next anecdote' click ={clickNext} />
    </div>
  )
}

export default App