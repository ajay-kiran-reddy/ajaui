import * as CONSTANTS from './constants';
import _ from 'lodash';

const defaultStore={
    loggedInUserDetails:null,
    sports:{
        selectedMatchDetails:null
    },
    todo:{
        editUser:null
    },
    signUpOrSignIn:true,
    accessToken:null,
    SelectedUserProfileId:null
};



 const Reducer=(state=defaultStore,action)=>{
     switch (action.type) {

         case CONSTANTS.STORE_LOGGED_IN_USER_DETAILS:{
             let item=action.value;
             let newState=_.cloneDeep(state);
             newState.loggedInUserDetails=item;
             return newState
         }

         case CONSTANTS.SELECTED_MATCH_DETAILS:{
             let item=action.value;
             let newState=_.cloneDeep(state);
             newState.sports.selectedMatchDetails=item;
             return newState
         }

         case CONSTANTS.EDIT_TODO_INFO:{
             let item=action.value;
             let newState=_.cloneDeep(state);
             newState.todo.editUser=item;
             return newState
         }
    
         case CONSTANTS.SHOW_SIGN_IN_OR_SIGN_UP:{
             let item=action.value;
             let newState=_.cloneDeep(state);
             newState.signUpOrSignIn=item;
             return newState
         }
         
         case CONSTANTS.ACCESS_TOKEN:{
             let item=action.value;
             let newState=_.cloneDeep(state);
             newState.accessToken=item;
             return newState;
         }
    
         case CONSTANTS.SELECTED_USER_PROFILE_ID:{
             let item=action.value;
             let newState=_.cloneDeep(state);
             newState.SelectedUserProfileId=item;
             return newState;
         }

         default :
             return state;
     }

 }

 export default Reducer;

