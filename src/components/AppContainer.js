import App from "./App";
import ContactActionCreator from "../actions/ContactActionCreator";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    isLoading: state.isLoading,
    name: state.name,
    showAddContact: state.showAddContact
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeShowAddContact: isShow =>
      dispatch(ContactActionCreator.changeShowAddContact(isShow)),
    changeName: name => dispatch(ContactActionCreator.changeName(name)),
    addContact: (name, tel, address) =>
      dispatch(ContactActionCreator.asyncAddContact(name, tel, address)),
    deleteContact: no => dispatch(ContactActionCreator.asyncDeleteContact(no)),
    searchContact: () => dispatch(ContactActionCreator.asyncSearchContact())
  };
};

//스토어의 상태와 디스패치 메서드를 app 컴포넌트에 속성으로 넣어 새로운 appcontainer컴포넌트를 생성
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export default AppContainer;
