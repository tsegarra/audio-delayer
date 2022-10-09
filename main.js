function beginAudioCapture() {
    document.querySelector('body').classList.add('user-accepted');

    const userMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia;

    const delaySliderElement = document.querySelector('#range-slider');
    const delayDisplayElement = document.querySelector('#range-display');

    let delayNode;

    const audioContext = new AudioContext();

    const setUpAudioDelay = function (stream) {
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

    if (userMedia) {
        navigator.getUserMedia({
                "audio": {
                    "mandatory": {
                        "googEchoCancellation": "false",
                        "googAutoGainControl": "false",
                        "googNoiseSuppression": "false",
                        "googHighpassFilter": "false"
                    },
                    "optional": []
                },
            }, setUpAudioDelay,
            function (e) {
                alert('error getting user media');
                console.error(e);
            });
    } else {
        alert('Your web browser does not support this operation.');
    }

    delaySliderElement.oninput = handleDelayUpdate;
}
