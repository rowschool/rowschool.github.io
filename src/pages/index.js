import React from "react"
import '../styles/main.scss';
import YinYangIcon from 'mdi-react/YinYangIcon';

export default function Home() {
  return (
    <div>
      <div className="main-container">
        <div className="header-text">
          <h1 className="header-text-logo">Row School</h1>
          <h3 className="header-text-description">Results-Oriented Work School</h3>
        </div>

        <div className="course-list even-columns-1">
          <div className="course-list-item-outer">
            <a href="http://rowschool.com/coderdojopgh" target="_blank">
              <div className="course-list-item-inner">
                <YinYangIcon className="course-list-item-icon" size="48" />

                <div className="course-list-item-inner-text">
                  <p className="course-list-item-name">CoderDojo Pittsburgh</p>
                  <p className="course-list-item-description">A free coding camp for students ages 7-17</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-container-content">
          <span className="footer-container-text">
            Feedback? <a href="mailto:neilthawani@gmail.com">Send an email</a>.
          </span>
        </div>
      </div>
    </div>
  )
}
