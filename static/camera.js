const constraints = {
    video: true
  };

//const captureVideoButton = document.querySelector('#screenshot .capture-button');
const screenshotButton = document.querySelector('#screenshot-button');
const img = document.querySelector('#screenshot img');
const video = document.querySelector('#screenshot video');

const canvas = document.createElement('canvas');

//get user details that were entered on the previous screen
function parseURLParams(url) {
  var queryStart = url.indexOf("?") + 1;
  var queryEnd = url.indexOf("#") + 1 || url.length + 1;
  var query = url.slice(queryStart, queryEnd - 1);
  var pairs = query.replace(/\+/g, " ").split("&");
  var parms = {}, i, n, v, nv;

  if (query == url || query == "") return;

  for (i = 0; i < pairs.length; i++) {
    nv = pairs[i].split("=", 2);
    n = decodeURIComponent(nv[0]);
    v = decodeURIComponent(nv[1]);

    if (!parms.hasOwnProperty(n)) parms[n] = v;
  }

  return parms;
}

var url = window.location.href;
var urlParams = parseURLParams(url);

console.log(urlParams);

//captureVideoButton.onclick = function() {
  navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
//};

screenshotButton.onclick = video.onclick = function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  // Other browsers will fall back to image/jpg
  const photo = canvas.toDataURL('image/png');
  img.src = photo;

  const data = {
    username: urlParams["username"],
    first_name: urlParams["first-name"],
    last_name: urlParams["last-name"],
    photo,
  }
  var myRequest = new Request('/save', {
    method: "POST",
    body: JSON.stringify(data),
  }
  );

  fetch(myRequest).then(function(response) {
    return response.blob();
  }).then(function(response) {
  });
};

function handleSuccess(stream) {
  screenshotButton.disabled = false;
  video.srcObject = stream;
}

function handleError() {
    
}