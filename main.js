navigator.getUserMedia = navigator.getUserMedia ||navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var analyser;
var microphone;

var range = document.querySelector('#range-slider');
var rangeDisplay = document.querySelector('#range-display');

var delayNode;

if (navigator.getUserMedia) {
  navigator.getUserMedia(
    {audio: true}, 
    function(stream) {
const aCtx = new AudioContext();
     delayNode  = aCtx.createDelay(100);
      microphone = aCtx.createMediaStreamSource(stream);
      delayNode.delayTime.value = 0;
      var destination=aCtx.destination;
      microphone.connect(delayNode);
      delayNode.connect(destination);
    },
    function(){ console.log("Error.")}
  );
}

range.oninput = function() {
  const newDelay = range.value;
  delayNode.delayTime.value = newDelay;
  rangeDisplay.textContent = newDelay;
}
