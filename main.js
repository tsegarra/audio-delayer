function beginAudioCapture() {
    document.querySelector('body').classList.add('user-accepted');

    const userMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia;

    const delaySliderElement = document.querySelector('#range-slider');
    const delayDisplayElement = document.querySelector('#range-display');

    let delayNode;
    
    const audioContext = new AudioContext();
    alert('got audio context');

    const setUpAudioDelay = function (stream) {
        alert('setting up audio delay');

        delayNode = audioContext.createDelay(100);
        delayNode.delayTime.value = 0;
        alert('configured delay node');

        const microphone = audioContext.createMediaStreamSource(stream);
        alert('got media stream source');
        microphone.connect(delayNode);
        alert('connected delay node');
        delayNode.connect(audioContext.destination);
        alert('connected to destination');
    };

    const handleDelayUpdate = function () {
        alert('delay update');
        const newDelay = delaySliderElement.value;
        delayNode.delayTime.value = newDelay;
        delayDisplayElement.textContent = newDelay;
    };

    const handleUserMediaError = function () {
        alert('An unexpected error occurred. Please try a different web browser or computer.');
    };

    if (userMedia) {
        alert('got user media');
        navigator.mediaDevices.getUserMedia({audio: true}).then(setUpAudioDelay); //, setUpAudioDelay, handleUserMediaError);
        alert('end of getting user media');
    } else {
        alert('Your web browser does not support this operation.');
    }

    delaySliderElement.oninput = handleDelayUpdate;
}
