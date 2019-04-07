import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ''
  };

  balanceSubmit = e => {
    e.preventDefault();

    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };

    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate);
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onDelete = e => {
    const { client, firestore, history } = this.props;

    firestore
      .delete({ collection: 'clients', doc: client.id })
      .then(history.push('/'));
  };

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = '';

    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="balanceUpdateAmount"
              className="form-control"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <Link to="/" className="btn btn-link">
                  <i className="fas fa-arrow-right">Backto Dashboard</i>
                </Link>
              </h2>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={this.onDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-header">
              {client.firstName}
              {'  '}
              {client.lastName}
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  CLient ID :{' '}
                  <span className="text-secondary">{client.id}</span>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    {' '}
                    Balance :{' '}
                    <span
                      className={classnames({
                        'text-danger': client.balance > 0,
                        'text-success': client.balance === 0
                      })}
                    >
                      {' '}
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>
                    <small>
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          })
                        }
                      >
                        {' '}
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                    {balanceForm}
                  </h3>
                </div>
              </div>
              <ul className="list-group">
                <li className="list-group-item">{client.phone}</li>
                <li className="list-group-item">{client.email}</li>
              </ul>
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
ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};
export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]), //  docs is to access the clients url by id
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
