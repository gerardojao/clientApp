import React from 'react'
import "../css/Footer.css"


const Footer = () => {
  return (
    <div className="footer">
        <div className="rrss">
            <a title="LinkedIn" href="https://linkedin.com/in/gerardojao" target="_blank"><i
                    className="fab fa-linkedin-in" aria-hidden="true"></i></a>
            <a title="GitHub"
                href="https://github.com/gerardojao" target="_blank"><i className="fab fa-github-alt"
                    aria-hidden="true"></i></a>
            <a title="Twitter" href="https://twitter.com/gerardojao"
                target="_blank"><i className="fab fa-twitter" aria-hidden="true"></i></a>
                
        </div>
        <div className="copyright">Created by <span className="name"> Gerardo Arrieta </span></div>
    </div>
  )
}

export default Footer