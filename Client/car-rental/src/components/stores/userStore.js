
import { legacy_createStore as createStore } from 'redux';

const userReducer = (state, action) => 
{
    // action.type = action.type.toUpperCase();    

    let  updatedState = {};

    switch (action.type) 
    {
        case "CREATE":
            updatedState.balance =  0;   
            break; 

        case "DEPOSIT":
            updatedState.balance =  state.balance + parseFloat(action.amount);
            break;
            
        case "WITHDRAW":
            if(state.balance < parseFloat(action.amount))  
            {
                alert("Insufficient Fund");
                updatedState.balance =  state.balance;
            }
            else
            {
                updatedState.balance =  state.balance - parseFloat(action.amount);
            }
            break;
        default:
           updatedState = state;
           break;
      }

      return updatedState;
};

const userStore = createStore(userReducer);
export default userStore;