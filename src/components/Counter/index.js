import {Component} from 'react'

import './index.css'

class Counter extends Component {
  render() {
    return (
      <div>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        <div>0</div>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
      </div>
    )
  }
}

export default Counter

import {Component} from 'react'

import Cookies from 'js-cookie'

import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    storiesList: [],
    posts: [],
    isLiked: false,
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getUserStories()
    this.getPosts()
  }

  getUserStories = async () => {
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const userStories = data.users_stories
      const formattedUserStories = userStories.map(eachItem => ({
        storyUrl: eachItem.story_url,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
      }))
      this.setState({storiesList: formattedUserStories})
    }
  }

  getPosts = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.posts
      const formattedData = fetchedData.map(eachItem => ({
        comments: eachItem.comments.map(each => ({
          comment: each.comment,
          userId: each.user_id,
          userName: each.user_name,
        })),
        createdAt: eachItem.created_at,
        likesCount: eachItem.likes_count,
        imageUrl: eachItem.post_details.image_url,
        caption: eachItem.post_details.caption,
        postId: eachItem.post_id,
        profilePic: eachItem.profile_pic,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
      }))
      this.setState({posts: formattedData, apiStatus: apiConstants.success})
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderStories = () => {
    const {storiesList} = this.state
    const settings = {
      slidesToShow: 6,
      slidesToScroll: 1,
      infinite: false,
      speed: 500,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 540,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 360,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <Slider {...settings}>
        {storiesList.map(eachItem => {
          const {userId, storyUrl, userName} = eachItem
          return (
            <div className="user-story-item" key={userId}>
              <div>
                <img className="story-image " src={storyUrl} alt="user story" />
              </div>

              <h1 className="user-story-name">{userName}</h1>
            </div>
          )
        })}
      </Slider>
    )
  }

  onClickLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
    }))
  }

  renderPosts = () => {
    const {posts, isLiked} = this.state

    return (
      <ul className="posts-items-container">
        {posts.map(eachItem => (
          <li
            testid="postItem"
            className="post-list-item"
            key={eachItem.postId}
          >
            <div className="profile-pic-name-container">
              <div className="profile-pic-container">
                <img
                  className="profile-pic"
                  alt="post author profile"
                  src={eachItem.profilePic}
                />
              </div>

              <h1 className="userName">{eachItem.userName}</h1>
            </div>
            <img className="post-image" alt="post" src={eachItem.imageUrl} />
            <div className="icons-container">
              {isLiked ? (
                <button
                  onClick={this.onClickLike}
                  className="like-button"
                  type="button"
                >
                  <FcLike className="icon-style" />
                </button>
              ) : (
                <button
                  onClick={this.onClickLike}
                  className="like-button"
                  type="button"
                >
                  <BsHeart className="icon-style" />
                </button>
              )}
              <button className="like-button" type="button">
                <FaRegComment className="icon-style" />
              </button>
              <button className="like-button" type="button">
                <BiShareAlt className="icon-style" />
              </button>
            </div>
            <p className="like-count">{eachItem.likesCount} likes</p>
            <p className="caption">{eachItem.caption}</p>

            {eachItem.comments.map(eachComment => (
              <>
                <p className="comment">
                  <span className="commented-username">
                    {eachComment.userName}
                  </span>
                  {eachComment.comment}
                </p>
              </>
            ))}
            <p className="post-created-at">{eachItem.createdAt}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    this.getPosts()
  }

  renderFailureHome = () => (
    <div className="failure-view-container">
      <img
        className="failure-view"
        alt="failure view"
        src="https://res.cloudinary.com/dss1xnwen/image/upload/v1692219660/d47dmt3vj6ebvjhw2inu.png"
      />
      <h1 className="failure-view-text">
        Something went wrong. Please try again.
      </h1>
      <button
        onClick={this.onClickRetry}
        type="button"
        className="try-again-button"
      >
        Try again
      </button>
    </div>
  )

  renderAllPostsViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderPosts()
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
        <div className="home-main-bg-container">
          <div className="slick-container">{this.renderStories()}</div>
          <hr className="line" />
          {this.renderAllPostsViews()}
        </div>
      </>
    )
  }
}
