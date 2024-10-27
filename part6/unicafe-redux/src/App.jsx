import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const feedback = useSelector(state => state)

  const handleGood = () => dispatch({ type: 'GOOD' })
  const handleOk = () => dispatch({ type: 'OK' })
  const handleBad = () => dispatch({ type: 'BAD' })
  const handleReset = () => dispatch({ type: 'ZERO' })

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleOk}>ok</button>
      <button onClick={handleBad}>bad</button>
      <button onClick={handleReset}>reset stats</button>
      <h1>Statistics</h1>
      <div>good {feedback.good}</div>
      <div>ok {feedback.ok}</div>
      <div>bad {feedback.bad}</div>
    </div>
  )
}

export default App