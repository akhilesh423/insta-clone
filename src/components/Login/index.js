import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  callSuccess = JWT => {
    const {history} = this.props
    Cookies.set('jwt_token', JWT, {expires: 30})
    history.replace('/')
  }

  getUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data.jwt_token)
      this.callSuccess(data.jwt_token)
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showError, errorMsg} = this.state
    return (
      <div className="whole-login-page-container">
        <img
          className="login-image"
          alt="website login"
          src="https://res.cloudinary.com/dss1xnwen/image/upload/v1692042145/ce2dza3eax4jfxr1eezp.png"
        />

        <div className="login-form-container">
          <img
            className="website-logo"
            alt="website logo"
            src="https://res.cloudinary.com/dss1xnwen/image/upload/v1692036610/bro2ics9vpxpevgpobgn.png"
          />
          <h1 className="insta-share-heading">Insta Share</h1>
          <form className="form-element" onSubmit={this.getUserDetails}>
            <div className="input-element-container">
              <label htmlFor="username" className="label-username">
                USERNAME
              </label>
              <input
                onChange={this.onChangeUsername}
                placeholder="Name"
                className="input-element"
                type="text"
                id="username"
              />
            </div>
            <div className="input-element-container">
              <label htmlFor="password" className="label-username">
                PASSWORD
              </label>
              <input
                onChange={this.onChangePassword}
                placeholder="Password"
                className="input-element"
                type="password"
                id="password"
              />
            </div>
            <button type="submit" className="login-button">
              login
            </button>
            {showError ? <p className="error-msg">{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
