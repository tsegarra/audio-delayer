function beginAudioCapture() {
    document.querySelector('body').classList.add('user-accepted');

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia;

    const delaySliderElement = document.querySelector('#range-slider');
    const delayDisplayElement = document.querySelector('#range-display');

    let delayNode;

    const setUpAudioDelay = function (stream) {
        alert('setting up audio delay');
        const audioContext = new AudioContext();
        alert('got audio context');

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

    if (navigator.getUserMedia) {
        alert('got user media');
        navigator.getUserMedia({audio: true}, setUpAudioDelay, handleUserMediaError);
    } else {
        alert('Your web browser does not support this operation.');
    }

    delaySliderElement.oninput = handleDelayUpdate;
}
