// Store/Reducers/ProgramReducer.js

const initialState = { runningProgram: null }

function ProgramReducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_PROGRAM':
      if (action.value !== state.runningProgram) {
        nextState = {
          ...state,
          runningProgram: action.value
        }
      }
      else {
        nextState = {
          ...state
        }
      }
      return nextState || state
    case 'STOP_PROGRAM':
      nextState = {
        ...state,
        runningProgram: null
      }
      return nextState
    default:
      return state
  }
}

export default ProgramReducer