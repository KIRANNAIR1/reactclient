import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layout/Alert';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { firebase, history, notifyUser } = this.props;
    const { email, password } = this.state;
    firebase
      .login({ email, password })
      .then(history.push('/'))
      .catch(err => notifyUser('invalid login credential', 'error'));
  };

  render() {
    const { message, messageType } = this.props.notify;

    return (
      <div className="row">
        <div className="col-md-6 mx-auto ">
          <div className="card">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center">
                {' '}
                <span className="text-primary">
                  <i className="fas fa-lock">
                    <h2>Login</h2>{' '}
                  </i>
                </span>
              </h1>

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary mb-2"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({ notify: state.notify }),
    { notifyUser }
  )
)(Login);
