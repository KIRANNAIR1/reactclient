import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import React, { Component } from 'react';

class EditClients extends Component {
  constructor(props) {
    super(props); // calls parent component the react component
    //create refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.balanceInput = React.createRef();
    this.phoneInput = React.createRef();
    this.emailInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const { client, firestore, history } = this.props;

    //updated Client
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      balance:
        this.balanceInput.current.value === ''
          ? 0
          : this.balanceInput.current.value,
      phone: this.phoneInput.current.value,
      email: this.emailInput.current.value
    };

    firestore
      .update({ collection: 'clients', doc: client.id }, updClient)
      .then(history.push('/'));
  };

  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-left">Back to Dashboard</i>
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Add Client</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">firstName</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    ref={this.firstNameInput}
                    defaultValue={client.firstName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">lastName</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    ref={this.lastNameInput}
                    defaultValue={client.lastName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    ref={this.emailInput}
                    defaultValue={client.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="balance">balance</label>
                  <input
                    type="text"
                    name="balance"
                    className="form-control"
                    ref={this.balanceInput}
                    defaultValue={client.balance}
                    disabled={disableBalanceOnEdit}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    ref={this.phoneInput}
                    defaultValue={client.phone}
                  />
                </div>

                <input
                  className="btn btn-primary btn-block"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border m-5" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }
}

EditClients.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]), //  docs is to access the clients url by id
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings: settings
  }))
)(EditClients);
