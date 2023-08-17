import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MyProfile extends Component {
  state = {
    myProfile: {},
    stories: [],
    posts: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
      }
      this.setState({
        myProfile: formattedData,
        stories: data.profile.stories,
        posts: data.profile.posts,
        apiStatus: apiConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoaderProfile = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderStory = () => {
    const {stories} = this.state
    return (
      <ul className="profile-story-list-container-my-profile">
        {stories.map(eachItem => (
          <li className="story-list-item-my-profile">
            <img
              className="my-profile-story-image-my-profile"
              alt="my story"
              src={eachItem.image}
            />
          </li>
        ))}
      </ul>
    )
  }

  renderPosts = () => {
    const {posts} = this.state
    const lengthOfPosts = posts.length === 0
    return (
      <ul className="posts-lists-container-my-profile">
        {lengthOfPosts
          ? this.renderNoPostsView()
          : posts.map(eachItem => (
              <li className="post-list-item-profile-my-profile">
                <img
                  className="post-image-my-profile"
                  alt="my post"
                  src={eachItem.image}
                />
              </li>
            ))}
      </ul>
    )
  }

  renderNoPostsView = () => (
    <div className="no-posts-container-my-profile">
      <BiCamera className="camera" />
      <h1 className="no-posts-my-profile">No Posts Yet</h1>
    </div>
  )

  renderProfile = () => {
    const {myProfile} = this.state
    const {
      userName,
      followersCount,
      followingCount,
      postsCount,
      profilePic,
      userBio,
    } = myProfile
    return (
      <div className="my-profile-details-cont">
        <div className="lg-profile-container">
          <img
            className="profile-img-lg-my-profile"
            alt="profile pic"
            src={profilePic}
          />
          <div className="profile-details-container">
            <h1 className="top-username">{userName}</h1>
            <div className="profile-pic-followers-count-container-sm-my-profile">
              <img
                alt="my profile"
                src={profilePic}
                className="profile-img-my-profile"
              />
              <div className="followers-count-whole-container-my-profile">
                <div className="count-container">
                  <h1 className="count">{postsCount}</h1>
                  <p className="count-name">posts</p>
                </div>
                <div className="count-container">
                  <h1 className="count">{followersCount}</h1>
                  <p className="count-name">followers</p>
                </div>
                <div className="count-container">
                  <h1 className="count">{followingCount}</h1>
                  <p className="count-name">following</p>
                </div>
              </div>
            </div>

            <div className="followers-whole-container-lg-my-profile">
              <p className="count-name ">
                <span className="count">{postsCount}</span> posts
              </p>
              <p className="count-name ">
                <span className="count">{followersCount}</span> followers
              </p>
              <p className="count-name ">
                <span className="count">{followingCount}</span> following
              </p>
            </div>

            <div className="user-bio-container">
              <h1 className="bottom-username">{userName}</h1>
              <p className="user-bio-my-profile">{userBio}</p>
            </div>
          </div>
        </div>
        {this.renderStory()}
        <hr className="line-my-profile" />
        <div className="posts-container-my-profile">
          <div className="grid-container">
            <BsGrid3X3 className="grid-icon" />
            <h1 className="posts-heading-my-profile">Posts</h1>
          </div>
          {this.renderPosts()}
        </div>
      </div>
    )
  }

  renderFailureHome = () => (
    <div className="failure-view-container-my-profile">
      <img
        className="failure-view"
        alt="failure view"
        src="https://res.cloudinary.com/dss1xnwen/image/upload/v1692219660/d47dmt3vj6ebvjhw2inu.png"
      />
      <p className="failure-view-text">
        Something went wrong. Please try again.
      </p>
      <button
        onClick={this.onClickRetry}
        type="button"
        className="try-again-button"
      >
        Try again
      </button>
    </div>
  )

  renderMyProfileViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderLoaderProfile()
      case apiConstants.success:
        return this.renderProfile()
      case apiConstants.failure:
        return this.renderFailureHome()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="my-profile-main-container">{this.renderProfile()}</div>
      </>
    )
  }
}

export default MyProfile
