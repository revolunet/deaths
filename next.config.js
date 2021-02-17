const { version } = require("./package.json")

module.exports = {
  env: {
    APP_VERSION: version,
    VERCEL_GITHUB_COMMIT_SHA: process.env.VERCEL_GITHUB_COMMIT_SHA,
  },
}
