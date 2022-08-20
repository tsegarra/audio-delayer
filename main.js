function beginAudioCapture() {
    document.querySelector('body').classList.add('user-accepted');

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia;

    const delaySliderElement = document.querySelector('#range-slider');
    const delayDisplayElement = document.querySelector('#range-display');

    let delayNode;

    const setUpAudioDelay = function (stream) {
        const audioContext = new AudioContext();

        delayNode = audioContext.createDelay(100);
        delayNode.delayTime.value = 0;

        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(delayNode);
        delayNode.connect(audioContext.destination);
    };

    const handleDelayUpdate = function () {
        const newDelay = delaySliderElement.value;
        delayNode.delayTime.value = newDelay;
        delayDisplayElement.textContent = newDelay;
    };

    const handleUserMediaError = function () {
        alert('An unexpected error occurred. Please try a different web browser or computer.');
    };

    if (navigator.getUserMedia) {
        navigator.getUserMedia({audio: true}, setUpAudioDelay, handleUserMediaError);
    } else {
        alert('Your web browser does not support this operation.');
    }

    delaySliderElement.oninput = handleDelayUpdate;
}
