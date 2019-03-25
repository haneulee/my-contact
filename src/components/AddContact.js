import React, { Component } from "react";
import PropTypes from "prop-types";
import ContactActionCreator from "../actions/ContactActionCreator";
import { connect } from "react-redux";

class AddContact extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.nameInput.focus();
  }
  save = () => {
    let name = this.nameInput.value;
    let tel = this.tellInput.value;
    let address = this.addressInput.value;
    if (name !== "" && tel !== "" && address !== "") {
      this.props.addContact(name, tel, address);
      this.props.history.push("/");
    } else {
      alert("fill in all fields...");
    }
  };
  cancel = () => {
    // this.props.changeShowAddContact(false);
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="modal">
        <div className="form">
          <h3 className="heading">::add new contact</h3>
          <div className="form-group">
            <label>name</label>
            <input
              type="text"
              name="name"
              className="long"
              placeholder="type your name"
              ref={name => {
                this.nameInput = name;
              }}
            />
          </div>
          <div className="form-group">
            <label>tell</label>
            <input
              type="text"
              name="tell"
              className="long"
              placeholder="type your phone number"
              ref={name => {
                this.tellInput = name;
              }}
            />
          </div>
          <div className="form-group">
            <label>address</label>
            <input
              type="text"
              name="address"
              className="long"
              placeholder="type your address"
              ref={name => {
                this.addressInput = name;
              }}
            />
          </div>
          <div className="form-group">
            <div>&nbsp;</div>
            <input
              type="button"
              className="btn btn-primary"
              value="save"
              onClick={this.save}
            />{" "}
            <input
              type="button"
              className="btn btn-primary"
              value="cancel"
              onClick={this.cancel}
            />
          </div>
        </div>
      </div>
    );
  }
}

AddContact.propTypes = {
  addContact: PropTypes.func.isRequired
  // changeShowAddContact: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    addContact: (name, tel, address) =>
      dispatch(ContactActionCreator.asyncAddContact(name, tel, address))
  };
};

const AddContactContainer = connect(
  null,
  mapDispatchToProps
)(AddContact);

export default AddContactContainer;
