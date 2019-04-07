import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class Clients extends Component {
  state = {
    totalowed: null
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);
      return { totalowed: total };
    }
    return null;
  }

  render() {
    const { clients } = this.props;
    const { totalowed } = this.state;

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users">Clients</i>
              </h2>
            </div>
            <div className="col-md-6">
              <h2 className="text-right text-secondary">
                total
                <span className="text-primary">
                  ${parseFloat(totalowed).toFixed(2)}
                </span>
              </h2>
            </div>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>firstName</th>
                <th>lastName</th>
                <th>balance</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>{client.balance}</td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      type="button"
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-right">Details</i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};
export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
