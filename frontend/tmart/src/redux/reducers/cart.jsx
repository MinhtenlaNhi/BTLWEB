export const cart = (state=[],action) => {
    // console.log(state);
    // console.log(action);
    console.log(state)
    switch(action.type){
        case "ADD":
            return action;
        default:
            return state;
    }

}