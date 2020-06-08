import React, { useState, useEffect } from "react";
import { ReactComponent as YoutubeIcon } from "../../../assets/img/svg/youtubeIcon.svg";
import { ReactComponent as FacebookIcon } from "../../../assets/img/svg/facebookIcon.svg";
import { ReactComponent as LinkedinIcon } from "../../../assets/img/svg/linkedinIcon.svg";
import { ReactComponent as TwitterIcon } from "../../../assets/img/svg/twitterIcon.svg";

import "./SocialLinks.scss";

export default function SocialLinks() {
  return (
    <div className="social-links">
      <a
        className="youtube"
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <YoutubeIcon />
      </a>
      <a
        className="twitter"
        href="https://www.twitter.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TwitterIcon />
      </a>
      <a
        className="facebook"
        href="https://www.facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon />
      </a>
      <a
        className="linkedin"
        href="https://www.linkedin.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedinIcon />
      </a>
    </div>
  );
}
