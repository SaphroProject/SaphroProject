const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = function(event) {
    const speechToText = event.results[0][0].transcript;
    console.log('Recognized text:', speechToText);
    // You can also set this text to an input field
    document.getElementById('messageInput').value = speechToText;
};

document.getElementById('recordButton').addEventListener('click', () => {
    if (recognition && recognition.state !== 'active') {
        recognition.start();
    } else {
        recognition.stop();
    }
});
