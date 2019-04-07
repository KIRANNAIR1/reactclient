import React, { Component } from 'react';
import {
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
  setAllowRegisteration
} from '../../actions/settingActions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Settings extends Component {
  allowRegisterationOnChange = () => {
    const { setAllowRegisteration } = this.props;
    setAllowRegisteration();
  };

  disableBalanceOnAddOnChange = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };
  disableBalanceOnEditOnChange = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  render() {
    const {
      allowRegisteration,
      disableBalanceOnAdd,
      disableBalanceOnEdit
    } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col md-6">
            <Link to="/">
              <i className="fas fa-arrow-right">Back to Dashboard</i>
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header"> Edit Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registeration</label>{' '}
                <input
                  type="checkbox"
                  name="allowRegisteration"
                  checked={!!allowRegisteration}
                  onChange={this.allowRegisterationOnChange}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance on Add </label>
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  checked={!!disableBalanceOnAdd}
                  onChange={this.disableBalanceOnAddOnChange}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance on Edit </label>
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  checked={!!disableBalanceOnEdit}
                  onChange={this.disableBalanceOnEditOnChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  setAllowRegisteration: PropTypes.func.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { setAllowRegisteration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
