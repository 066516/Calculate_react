import { useReducer } from "react";
import "./Style.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
export const Actions = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPRATION: 'choose-opration',
  CLEAR: 'clear',
  DELETE_DEGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}
function reducer(state, { type, payload }) {
  switch (type) {
    case Actions.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          overwrite:false,
          currOperand:payload.digit,
        }
      }
      if (payload.digit === "0" && state.currOperand === "0") return state
      if (payload.digit === "." && state.currOperand.includes(".")) return state

      return {
        ...state,
        currOperand: `${state.currOperand || ""}${payload.digit}`,

      }
    case Actions.CHOOSE_OPRATION:
      if (state.currOperand == null && state.prevOperand == null) return state
      if (state.currOperand == null) {
        return {
          ...state,
          opration: payload.opration
        }
      }
      if (state.prevOperand == null) {
        return {
          ...state,
          opration: payload.opration,
          prevOperand: state.currOperand,
          currOperand: null,
        }
      }
      return {
        ...state,
        prevOperand: evaluate(state),
        opration: payload.opration,
        currOperand: null,
      }
    // return {
    //   ...state,
    //   currOperand: `${state.currOperand || ""}${payload.opration}`,

    // }
    case Actions.CLEAR:
      return {}
      case Actions.DELETE_DEGIT:
        if(state.overwrite) return {
          ...state,
          overwrite:false,
          currOperand:null,
        }
        if(state.currOperand==null) return state
        if(state.currOperand.lenght===1){
          return{
            ...state,
            currOperand:null,
          }
        }
        return{
          ...state,
          currOperand:state.currOperand.slice(0,-1)
        }
    case Actions.EVALUATE:
      if (state.opration == null || state.currOperand == null || state.prevOperand == null)
       return state
         return{
          ...state,
          overwrite:true,
          prevOperand:null,
          opration:null,
          currOperand:evaluate(state)
         }
    default:
      break;

  }

}
function evaluate({ currOperand, prevOperand, opration }) {

  if (isNaN(currOperand) || isNaN(prevOperand)) return ""
  let comp = ""
  switch (opration) {
    case "+":
      comp = +currOperand + +prevOperand
      break
    case "-":
      comp = prevOperand - currOperand
      break
    case "/":
      comp = prevOperand / currOperand
      break
    case "*":
      comp = currOperand * prevOperand
      break
    default:
      break
  }
  return comp.toString();

}
function App() {
  const [{ currOperand, prevOperand, opration }, dispatch] = useReducer(reducer, {})
  return (
    <div className="calculater_grid">
      <div className='output'>
        <div className='prv_operand'>{prevOperand} {opration}</div>
        <div className='curr_operand'>{currOperand}</div>
      </div>
      <button className='span_two' onClick={() => dispatch({ type: Actions.CLEAR })}>AC</button>
      <button onClick={()=>dispatch({type:Actions.DELETE_DEGIT})}>DEl</button>
      <OperationButton opration="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />

      <OperationButton opration="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5 " dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />

      <OperationButton opration="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />

      <OperationButton opration="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />

      <button className='span_two' onClick={()=>dispatch({type:Actions.EVALUATE})}>=</button>

    </div>
  );
}

export default App;
