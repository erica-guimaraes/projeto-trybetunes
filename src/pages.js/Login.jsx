import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  state = {
    nameLogin: '',
    btnDisable: true,
    isLoading: false,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    const tamMinino = 3;
    this.setState({
      [name]: value,
      btnDisable: value.length < tamMinino,
    });
  };

  handleClick = async () => {
    const { nameLogin } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: nameLogin });
    history.push('/search');
  };

  render() {
    const { nameLogin, btnDisable, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        { isLoading ? <Carregando /> : (
          <form>
            <input
              data-testid="login-name-input"
              type="text"
              value={ nameLogin }
              name="nameLogin"
              onChange={ this.onInputChange }
            />
            <button
              data-testid="login-submit-button"
              disabled={ btnDisable }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>
        )}

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
