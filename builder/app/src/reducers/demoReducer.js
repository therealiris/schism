import objectAssign from 'object-assign'
import {
  DEMO_ACTION
} from '../actions/actionTypes'
import InitialState from '../store/initialState'

/**
 * Documentation module reducer
 */
export default function demo(state = InitialState.demo, action) {
  let _state = null
  switch(action.type) {
    case DEMO_ACTION:
      _state = objectAssign({}, state)
      _state.demo = action.text
      return _state
    break;

    default:
      return state;
  }
}
