var request = require('request');
var GITHUB_USER = "99hsueh";
var GITHUB_TOKEN = "06d8e651ef44bb56bb122d208b9793516e5bd04c";

console.log('Welcome to the GitHub Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});