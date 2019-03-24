import Constant from "../Constants";
import update from "immutability-helper";

const initialState = {
  contacts: [],
  isLoading: false,
  name: "",
  showAddContact: false
};

//이 모달박스 변경 작업은 여러 액션에서처리하므로 미리 정의하여 호출
let changeIsLoading = (state, isLoading) => {
  let newState = update(state, {
    isLoading: { $set: isLoading }
  });
  return newState;
};

//reducer는 순수함수 > 불변성 확보
const ContactReducer = (state = initialState, action) => {
  let newState, index;
  switch (action.type) {
    case Constant.SEARCH_REQUEST:
      newState = update(state, {
        contacts: { $set: [] },
        name: { $set: action.payload.name }
      });
      return changeIsLoading(newState, true);
    case Constant.SEARCH_SUCCESS:
      newState = update(state, {
        contacts: { $set: action.payload.contacts }
      });
      return changeIsLoading(newState, false);
    case Constant.SEARCH_FAIL:
      return changeIsLoading(state, false);
    case Constant.CHANGE_NAME:
      return (newState = update(state, {
        name: { $set: action.payload.name }
      }));
    // case Constant.CHANGE_SHOW_ADD_CONTACT:
    //   return (newState = update(state, {
    //     showAddContact: { $set: action.payload.showAddContact }
    //   }));
    default:
      return state;
  }
};

export default ContactReducer;
