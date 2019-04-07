import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import { notifyUser } from '../../actions/notifyActions';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Register extends Component {
  state = {
    email: '',
    password: ''
    // firstName: '',
    // lastName: ''
  };

  componentWillMount() {
    const { allowRegisteration } = this.props.settings;
    if (!allowRegisteration) {
      this.props.history.push('/login');
    }
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    firebase
      .createUser({ email, password })
      .catch(err => notifyUser('User already registerd', 'error'));
  };
  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center">
                <span className="text-primary">
                  <i className="fas fa-user-plus">
                    <h2>Register</h2>
                  </i>
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                {/* <div className="form-group">
              <label htmlFor="firstName">firstName</label>
              <input
                type="text"
                className="form-control"
                value={this.state.firstName}
                name="firstName"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">lastName</label>
              <input
                type="text"
                className="form-control"
                value={this.state.lastName}
                name="lastName"
                onChange={this.onChange}
              />
            </div> */}
                <div className="form-group">
                  <label htmlFor="email">email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={this.state.password}
                    name="password"
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block"
                  value="Register"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({ notify: state.notify, settings: state.settings }),
    { notifyUser }
  )
)(Register);
