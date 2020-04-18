const { version } = require("./package.json")

module.exports = {
  env: {
    APP_VERSION: version,
    NOW_GITHUB_COMMIT_SHA: process.env.NOW_GITHUB_COMMIT_SHA,
  },
}
