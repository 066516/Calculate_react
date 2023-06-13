import React from 'react'
import { Actions } from './App'
function OperationButton({dispatch,opration}) {
  return (
    <button
    onClick={()=>dispatch({type:Actions.CHOOSE_OPRATION,payload:{opration}})}
    >
      {opration }
    </button>
  )
}
export default OperationButton
