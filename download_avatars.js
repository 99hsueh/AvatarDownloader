var GITHUB_USER = "99hsueh";
var GITHUB_TOKEN = "06d8e651ef44bb56bb122d208b9793516e5bd04c";
var fs = require('fs');
var request = require('request').defaults({
  auth: {
    user: GITHUB_USER,
    pass: GITHUB_TOKEN
  },
  headers: {
    'User-Agent': 'Stuff/1.0' // Github User-Agent header on all API requests, (Solves 403 error)
  },
  json: true
});

console.log('Welcome to the GitHub Avatar Downloader');

function avatarArray(user) {
  return {
    name: user.login,
    avatarUrl: user.avatar_url
  };
}

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  request.get(requestURL, function(err, response, body){
    if(err){
      return cb(err);
    }
    if(!(body instanceof Array)) {
    return cb(body);
    }
    var contributors = body.map(avatarArray);
    cb(null, contributors);
  })
}

function downloadImageByURL(url, filePath) {
  var stream = fs.createWriteStream('./avatarPic/' + url.name + '.jpg');
  request.get(url.avatarUrl)               // Note 1
    .on('error', function (err) {                                   // Note 2
      throw err;
    })
    .on('response', function (response) {                           // Note 3
      console.log('Response Status Code: ', response.statusCode, 'downloading~~~');
    })
    .pipe(stream);
}

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  if (!(process.argv[2] || process.argv[3])){
    console.log("Please enter: repoOwner, repoName before proceeding.");
    return;
  }
  if(err) {
    console.log("Errors:", err);
    return;
  }
  result.forEach(function(user) {
    downloadImageByURL(user);
  });
});


