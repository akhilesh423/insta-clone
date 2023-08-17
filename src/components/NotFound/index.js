import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      alt="page not found"
      src="https://res.cloudinary.com/dss1xnwen/image/upload/v1692302084/u5kgd2bve93x34qrnnlr.png"
    />
    <h1 className="page-not-found">PAGE NOT FOUND</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found.
    </p>
    <Link className="link-element" to="/">
      <button type="button" className="not-found-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
