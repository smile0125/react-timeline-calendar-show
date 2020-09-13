import { INPUT_CHANGE } from '../action/actionTypes.jsx';
const initialState = {
    province: '北京市',
    city: '北京市',
    area: '东城区',
    is_default: 0,
    id: '',
    buyCount: 1
};
const inputChangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            let new_state = JSON.parse(JSON.stringify(state));
            new_state[action.payload.type] = action.payload.val;
            return new_state;
        default:
            return state;
    }
};
export default inputChangeReducer;