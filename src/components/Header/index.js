import {Component} from 'react'
import Cookies from 'js-cookie'

import {withRouter, Link} from 'react-router-dom'

import {MdCancel} from 'react-icons/md'
import {FaSearch} from 'react-icons/fa'

import './index.css'

class Header extends Component {
  state = {isClicked: false}

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  renderOnClickMenu = () => (
    <ul className="menu-items-container">
      <Link to="/" className="link-header">
        <li className="menu-list-item list-item-style">Home</li>
      </Link>
      <li className="menu-list-item list-item-style">Search</li>
      <Link to="/my-profile" className="link-header">
        <li className="menu-list-item list-item-style">Profile</li>
      </Link>
      <li className="menu-list-item">
        <button
          className="logout-button"
          type="button"
          onClick={this.onClickLogout}
        >
          Logout
        </button>
      </li>
      <li className="menu-list-item">
        <button
          onClick={this.onClickCancel}
          type="button"
          className="menu-button"
        >
          <MdCancel className="cancel-icon" />
        </button>
      </li>
    </ul>
  )

  onClickMenu = () => {
    this.setState({isClicked: true})
  }

  onClickCancel = () => {
    this.setState({isClicked: false})
  }

  render() {
    const {isClicked} = this.state
    return (
      <nav className="navbar">
        <div className="navbar-first-container">
          <div className="header-items-container">
            <Link to="/" className="link-header">
              <img
                className="header-logo"
                alt="website logo"
                src="https://res.cloudinary.com/dss1xnwen/image/upload/v1692036610/bro2ics9vpxpevgpobgn.png"
              />
            </Link>
            <h1 className="header-website-name">Insta Share</h1>
          </div>

          <button
            onClick={this.onClickMenu}
            className="menu-button"
            type="button"
          >
            <img
              className="header-menu"
              alt="menu"
              src="https://res.cloudinary.com/dss1xnwen/image/upload/v1692111950/pt4vbc7dlxfiqjgcgdbt.png"
            />
          </button>

          <ul className="list-items-big-screen-container">
            <li className="menu-list-item search-list-item">
              <input
                className="search-input"
                type="search"
                placeholder="Search Caption"
              />
              <button className="search-button" type="button">
                <FaSearch className="search-icon" />
              </button>
            </li>
            <Link to="/" className="link-header">
              <li className="menu-list-item list-item-style">Home</li>
            </Link>
            <Link to="/my-profile" className="link-header">
              <li className="menu-list-item list-item-style">Profile</li>
            </Link>

            <li className="menu-list-item">
              <button
                onClick={this.onClickLogout}
                className="logout-button"
                type="button"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        {isClicked ? this.renderOnClickMenu() : ''}
      </nav>
    )
  }
}

export default withRouter(Header)
