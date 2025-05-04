import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div id="foot">
        <div className="fcontain">
            <div className="fool">
                <img src={assets.logo} alt="" className='amader-logo'/>
                <p>A restaurant should remove you from the mundane burdens of everyday life and transport you to another world</p>
                <div className="social">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="fooc">
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delievery</li>
                        <li>Privacy policy</li>
                    </ul>
            </div>
            <div className="foor">
                <h2>Get In Touch</h2>
                <ul>
                    <li>+911122334455</li>
                    <li>asuperstar0@gmail.com</li>
                </ul>
        </div>
      </div>
      <hr />
      <p className='copyright'>&copy;Copyright: All right Reserved</p>
    </div>
  )
}

export default Footer