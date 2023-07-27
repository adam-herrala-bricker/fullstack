import { useState } from 'react'

const TextLine = ({text}) => <p>{text}</p>

const VoteLine = ({votes}) => <p>has {votes} votes.</p>

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
  const [shownAnecdotes, setShownAnecdotes] = useState([selected]) //want to avoid repeats before every one has been shown
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

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
      console.log('reset')
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
  
  const clickVote = (selected) => {
    const votesCopy = [...votes] //important to do it this way; unclear why
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  return (
    <div>
      <TextLine text={anecdotes[selected]} />
      <VoteLine votes={votes[selected]} />
      <Button text='next anecdote' click ={clickNext} />
      <Button text='vote' click={() => clickVote(selected)} /> 
    </div>
  )
}

export default App