import React from "react"

const version = process.env.APP_VERSION || "0.0.0"
const sha = process.env.NOW_GITHUB_COMMIT_SHA || "dev"

const Footer = () => (
  <footer>
    <div>Chewam © 2020</div>
    <div>
      version {version} (&nbsp;
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://github.com/chewam/deaths/tree/${sha}`}
      >
        {sha.substring(0, 7)}
      </a>
      &nbsp;)
    </div>
  </footer>
)

export default Footer