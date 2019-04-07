import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class AddClients extends Component {
  state = {
    firstName: '',
    lastName: '',
    balance: '',
    phone: '',
    email: ''
  };

  onSubmit = e => {
    e.preventDefault();
    const newClient = this.state;

    const { firestore, history } = this.props;

    if (newClient.balance === '') {
      newClient.balance = 0;
    }

    firestore
      .add({ collection: `clients` }, newClient)
      .then(() => history.push('/'));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegisteration
    } = this.props.settings;
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
                  value={this.state.firstName}
                  onChange={this.onChange}
                  placeholder="add first Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">lastName</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  placeholder="add last Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder="add email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">balance</label>
                <input
                  type="text"
                  name="balance"
                  className="form-control"
                  value={this.state.balance}
                  onChange={this.onChange}
                  placeholder="add balance"
                  disabled={disableBalanceOnAdd}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={this.state.phone}
                  onChange={this.onChange}
                  placeholder="add phone"
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
  }
}

AddClients.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClients);
