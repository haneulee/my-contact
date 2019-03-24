import Constant from "../Constants";
import axios from "axios";

const BASEURL = "http://sample.bmaster.kro.kr";

const ContactActionCreator = {
  changeName(name) {
    return { type: Constant.CHANGE_NAME, payload: { name } };
  },
  changeShowAddContact(isShow) {
    return {
      type: Constant.CHANGE_SHOW_ADD_CONTACT,
      payload: { showAddContact: isShow }
    };
  },
  changeIsLoading(isShow) {
    return {
      type: Constant.CHANGE_ISLOADING,
      payload: { isLoading: isShow }
    };
  },
  searchContactRequest(name) {
    return {
      type: Constant.SEARCH_REQUEST,
      payload: { name }
    };
  },
  searchContactSuccess(contacts) {
    return {
      type: Constant.SEARCH_SUCCESS,
      payload: { contacts }
    };
  },
  searchContactFail() {
    return {
      type: Constant.SEARCH_FAIL
    };
  },
  asyncSearchContact() {
    return (dispatch, getState) => {
      let { name } = getState();
      if (name.length >= 2) {
        dispatch(this.searchContactRequest(name));
        axios
          .get(BASEURL + "/contacts_long/search/" + name)
          .then(response => {
            dispatch(this.searchContactSuccess(response.data));
          })
          .catch(error => {
            dispatch(this.searchContactFail());
          });
      }
    };
  },
  asyncAddContact(name, tel, address) {
    return (dispatch, getState) => {
      dispatch(this.changeName(name));
      dispatch(this.changeIsLoading(true));
      axios
        .post(BASEURL + "/contacts", { name, tel, address })
        .then(response => {
          //   dispatch(this.changeShowAddContact(false));
          if (response.data.status === "sucess") {
            dispatch(this.changeIsLoading(false));
            dispatch(this.asyncSearchContact());
          } else {
            dispatch(this.changeIsLoading(false));
          }
        })
        .catch(error => {
          dispatch(this.changeIsLoading(false));
        });
    };
  },
  asyncDeleteContact(no) {
    return dispatch => {
      dispatch(this.changeIsLoading(true));
      axios
        .delete(BASEURL + "/contacts/" + no)
        .then(response => {
          dispatch(this.changeIsLoading(false));
          dispatch(this.asyncSearchContact());
        })
        .catch(error => {
          dispatch(this.changeIsLoading(false));
        });
    };
  }
};

export default ContactActionCreator;
