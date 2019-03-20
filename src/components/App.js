import React, { Component } from "react";
import axios from "axios";

import InputName from "./InputName";
import ContactList from "./ContactList";
import Loading from "./Loading";
import { Portal } from "react-portal";
import AddContact from "./AddContact";
import PropTypes from "prop-types";

const BASEURL = "http://sample.bmaster.kro.kr";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     contacts: [],
  //     isLoading: false,
  //     name: "",
  //     showAddContact: false
  //   };
  // }
  // changeName = name => {
  //   this.setState({ name: name });
  // };
  // searchContact = () => {
  //   let { name } = this.state;
  //   if (name.length >= 2) {
  //     this.setState({ isLoading: true });
  //     axios
  //       .get(BASEURL + "/contacts_long/search/" + name)
  //       .then(response => {
  //         this.setState({ contacts: response.data, isLoading: false });
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         this.setState({ isLoading: false });
  //       });
  //   } else {
  //     this.setState({ contacts: [] });
  //   }
  // };
  // changeShowAddContact = state => {
  //   this.setState({ showAddContact: state });
  // };
  // addContact = (name, tel, address) => {
  //   this.setState({ name: name });
  //   axios.post(BASEURL + "/contacts", { name, tel, address }).then(response => {
  //     if (response.data.status === "success") {
  //       this.searchContact();
  //     }
  //     this.changeShowAddContact(false);
  //   });
  // };
  // deleteContact = no => {
  //   axios.delete(BASEURL + "/contacts/" + "no").then(response => {
  //     this.searchContact();
  //   });
  // };
  render() {
    return (
      <div className="container">
        <div className="well">
          <div className="col-xs-1" />
          <div className="title col-xs-10">::contact app</div>
          <div className="col-xs-1">
            <button
              className="btn btn-warning btn-circle"
              onClick={() => this.props.changeShowAddContact(true)}
            >
              <span className="glyphicon glyphicon-plus" />
            </button>
          </div>
          <div className="clearfix" />
        </div>
        <div className="panel panel-default panel-borderless">
          <div className="panel-body">
            <InputName
              searchContact={this.props.searchContact}
              name={this.props.name}
              changeName={this.props.changeName}
            />
          </div>
        </div>
        <ContactList
          contacts={this.props.contacts}
          deleteContact={this.props.deleteContact}
        />
        {this.props.showAddContact ? (
          <AddContact
            addContact={this.props.addContact}
            changeShowAddContact={this.props.changeShowAddContact}
          />
        ) : (
          ""
        )}
        <Portal node={document && document.getElementById("modal-area")}>
          <Loading isLoading={this.props.isLoading}>
            <div className="well title">
              <h4>looking for data...</h4>
            </div>
          </Loading>
        </Portal>
      </div>
    );
  }
}

App.propTypes = {
  changeShowAddContact: PropTypes.func.isRequired,
  changeName: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  searchContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  showAddContact: PropTypes.bool.isRequired
};

export default App;
