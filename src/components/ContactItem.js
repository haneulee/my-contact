import React, { Component } from "react";
import PropTypes from "prop-types";

class ContactItem extends Component {
  render() {
    return (
      <div>
        <li className="list-group-item">
          <div className="col-xs-3">
            <img
              src={this.props.photo}
              alt={this.props.name}
              className="img-reponsive img-thumbnail photoWidth"
            />
          </div>
          <div className="col-xs-8">
            <span className="name">{this.props.name}</span>
            <span className="glyphicon glyphicon-hand-right" />{" "}
            <span>id: {this.props.no}</span>
            <br />
            <span className="glyphicon glyphicon-hand-right" />{" "}
            <span>{this.props.tel}</span>
            <br />
            <span className="glyphicon glyphicon-hand-right" />{" "}
            <span>{this.props.address}</span>
            <br />
          </div>
        </li>
      </div>
    );
  }
}

ContactItem.propTypes = {
  no: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  tel: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired
};
export default ContactItem;
