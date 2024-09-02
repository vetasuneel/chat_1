 (function () {
            // Inject CSS into the page
            const style = document.createElement('style');
            style.textContent = `
            * {
                box-sizing: border-box;
            }

            .powered-by {
                text-align: center;
                font-size: 12px;
                color: #999;
                margin-top: 6px;
                padding-bottom: 4px;
            }

            .powered-by a {
                color: #956fd6;
                text-decoration: none;
                font-weight: bold;
            }

            .chat-icon-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                z-index: 1000;
            }

            .chat-icon-container .speech-bubble {
                background: #956fd6;
                color: white;
                padding: 8px 12px;
                border-radius: 12px;
                margin-bottom: 8px;
                font-size: 14px;
                max-width: 296px;
                text-align: left;
                position: relative;
                animation: fadeIn 0.5s ease-in-out forwards;
                opacity: 0;
            }

            .chat-icon-container .speech-bubble::before {
                content: '';
                position: absolute;
                bottom: -8px;
                right: 20px;
                border-width: 8px;
                border-style: solid;
                border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
            }

            .chat-icon-container .speech-bubble .close-speech {
                position: absolute;
                bottom: 30px;
                right: 5px;
                font-size: 23px;
                cursor: pointer;
                color: white;
            }

            @keyframes fadeIn {
                to {
                    opacity: 1;
                }
            }

            .chat-icon {
                background: linear-gradient(135deg, #956fd6, #8b5fd4);
                color: white;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-size: 30px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                transition: all 0.3s ease;
            }

            .chat-icon i {
                font-size: 28px;
                color: white;
                transition: transform 0.3s ease;
            }

            .chat-icon:hover {
                background: linear-gradient(135deg, #8b5fd4, #7231a5);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
            }

            .chat-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                max-width: 90%;
                height: 500px;
                background-color: #ffffff;
                border-radius: 15px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                display: flex;
                flex-direction: column;
                z-index: 1001;
                transform: translateY(100%);
                opacity: 0;
                transition: transform 0.4s ease, opacity 0.4s ease;
                visibility: hidden;
            }

            .chat-container.open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }

            .chat-container.close {
                transform: translateY(100%);
                opacity: 0;
                visibility: hidden;
            }

            .chat-header {
                background-color: white;
                padding: 15px;
                color: black;
                border-radius: 15px 15px 0 0;
                font-weight: 600;
                font-size: 18px;
                display: flex;
                justify-content: space-between;
            }

            .chat-header .close-btn {
                font-size: 27px;
                cursor: pointer;
                color: #956fd6;
            }

            .chat-box {
                flex-grow: 1;
                padding: 15px;
                overflow-y: auto;
                background-color: #f9f9f9;
                height: 300px;
            }

            .chat-input {
                display: flex;
                padding: 10px;
                background-color: #f1f1f1;
                border-top: 1px solid #ddd;
                border-radius: 0 0 15px 15px;
            }

            .chat-input input {
                flex: 1;
                border: none;
                padding: 10px;
                outline: none;
                font-size: 14px;
                border-radius: 20px;
                background-color: #fff;
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .chat-input button {
                background-color: #956fd6;
                color: #fff;
                border: none;
                padding: 10px 20px;
                margin-left: 10px;
                border-radius: 20px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                font-size: 14px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .chat-input button i {
                font-size: 16px;
            }

            .chat-input button:hover {
                background-color: #8b5fd4;
                color: white;
            }

            .message {
                display: flex;
                align-items: flex-start;
                margin: 10px 0;
            }

            .message.user-message {
                justify-content: flex-end;
            }

            .message.ai-message {
                justify-content: flex-start;
            }

            .message-content {
                max-width: 75%;
                padding: 10px;
                font-size: 14px;
                line-height: 1.4;
                word-wrap: break-word;
                border-radius: 15px;
                position: relative;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }

            .message.user-message .message-content {
                background: linear-gradient(135deg, #956fd6, #8b5fd4);
                color: #fff;
                border-radius: 15px 15px 0 15px;
            }

            .message.ai-message .message-content {
                background-color: #f1f1f1;
                color: #333;
                border-radius: 15px 15px 15px 0;
            }

            .timestamp {
                font-size: 12px;
                color: #999;
                margin-top: 5px;
                text-align: right;
            }

            a {
                color: #0d6efd;
                text-decoration: none;
                font-size: 14px;
                word-break: break-all;
            }

            .predefined-inputs {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-bottom: 10px;
            }

            .predefined-btn {
                background: #956fd6;
                color: white;
                padding: 10px;
                border-radius: 15px;
                cursor: pointer;
                font-size: 14px;
                border: 1px solid transparent;
                transition: all 0.3s ease;
                text-align: left;
                width: fit-content;
                max-width: 80%;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                position: relative;
                overflow: hidden;
            }

            .predefined-btn::after {
                content: '';
                position: absolute;
                top: 0;
                left: -50px;
                width: 200%;
                height: 100%;
                background: rgb(149,111,214);
                color: black;
                transform: skewX(-45deg);
                transition: all 0.3s ease;
                opacity: 0;
            }

            .predefined-btn:hover::after {
                left: 100%;
                opacity: 0.3;
            }

            .predefined-btn:hover {
                background-color: #d3d3d3;
                border: 1px solid #aaa;
                color: black;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            }

            .typing-indicator {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 10px;
                margin-top: 8px;
            }

            .dot {
                height: 5px;
                width: 5px;
                margin: 0 5px;
                background-color: #956fd6;
                border-radius: 50%;
                display: inline-block;
                animation: dot-blink 1.5s infinite ease-in-out;
            }

            .dot:nth-child(1) {
                animation-delay: 0s;
            }

            .dot:nth-child(2) {
                animation-delay: 0.3s;
            }

            .dot:nth-child(3) {
                animation-delay: 0.6s;
            }

            @keyframes dot-blink {
                0%, 20% {
                    transform: scale(1);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.5);
                    opacity: 0.5;
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `;
            document.head.appendChild(style);

            // Inject HTML into the page
            const chatHTML = `
            <div class="chat-icon-container">
                <div class="speech-bubble">
                    Unleash Potential with Ideapad—Your Success Catalyst! 😎
                    <span class="close-speech">&times;</span>
                </div>
                <div class="chat-icon" id="chat-icon">
                    <i class="fas fa-comments"></i>
                </div>
            </div>

            <div class="chat-container" id="chat-container">
                <div class="chat-header">
                    <center><img src="https://raw.githubusercontent.com/vetasuneel/chatbot_test_18/main/idea_pad.png" style="width: 120px; text-align: center;" alt="Header Image"></center>
                    <span class="close-btn" id="close-btn">&times;</span>
                </div>
                <div id="chat-box" class="chat-box">
                    <div class="predefined-inputs" id="predefined-inputs">
                        <div class="predefined-btn" data-message="AI White Label">AI White Label</div>
                        <div class="predefined-btn" data-message="E-Commerce White Label">E-Commerce White Label</div>
                        <div class="predefined-btn" data-message="Marketing White Label">Marketing White Label</div>
                        <div class="predefined-btn" data-message="Affiliate Mega">Affiliate Mega</div>
                        <div class="predefined-btn" data-message="Amazon Services">Amazon Services</div>

                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" id="user-input" placeholder=" Type your message...">
                    <button id="send-btn">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                <div class="powered-by">powered by <a href="https://ideapad.ai/">IdeaPad</a></div>
            </div>
        `;
            document.body.insertAdjacentHTML('beforeend', chatHTML);

            // JavaScript functionality
            document.addEventListener('DOMContentLoaded', function () {
                const chatIcon = document.getElementById('chat-icon');
                const chatContainer = document.getElementById('chat-container');
                const closeBtn = document.getElementById('close-btn');
                const sendBtn = document.getElementById('send-btn');
                const userInput = document.getElementById('user-input');
                const chatBox = document.getElementById('chat-box');
                const closeSpeechBtn = document.querySelector('.close-speech');
                const speechBubble = document.querySelector('.speech-bubble');

                chatIcon.addEventListener('click', function () {
                    if (chatContainer.classList.contains('open')) {
                        chatContainer.classList.remove('open');
                        chatContainer.classList.add('close');
                    } else {
                        chatContainer.classList.remove('close');
                        chatContainer.classList.add('open');
                        userInput.focus();
                        scrollToBottom();
                    }
                });

                closeBtn.addEventListener('click', function () {
                    chatContainer.classList.remove('open');
                    chatContainer.classList.add('close');
                });

                closeSpeechBtn.addEventListener('click', function () {
                    speechBubble.style.display = 'none';
                });

                sendBtn.addEventListener('click', function () {
                    sendMessage(userInput.value.trim());
                });

                userInput.addEventListener('keypress', function (e) {
                    if (e.which === 13) {
                        sendMessage(userInput.value.trim());
                        return false;
                    }
                });

                document.querySelectorAll('.predefined-btn').forEach(function (button) {
                    button.addEventListener('click', function () {
                        const message = this.getAttribute('data-message');
                        sendMessage(message);
                        document.getElementById('predefined-inputs').remove();
                    });
                });

                function sendMessage(message) {
                    if (message === "") return;

                    userInput.value = '';

                    appendMessage('user', message);

                    // Show typing indicator
                    showTypingIndicator();

                    console.log("Sending message:", message);

                    // Make an AJAX request to the server using Fetch API
                    fetch('https://dbb7-121-52-154-72.ngrok-free.app/chat', {  // Replace with your server endpoint
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ message: message })
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log("Received response:", data);
                            // Hide typing indicator
                            hideTypingIndicator();
                            appendMessage('ai', data.response);
                            // Optionally append a link if provided
                            if (data.link) {
                                appendMessage('ai', `<a href="${data.link}">${data.link}</a>`);
                            }
                            scrollToBottom();
                        })
                        .catch(error => {
                            console.error("Error during AJAX request:", error);
                            // Hide typing indicator
                            hideTypingIndicator();
                            appendMessage('ai', 'Sorry, something went wrong. Please try again later.');
                            scrollToBottom();
                        });
                }

                function appendMessage(sender, content) {
                    const messageClass = sender === 'user' ? 'user-message' : 'ai-message';
                    const timestamp = new Date().toLocaleString();

                    const messageHTML = `
                    <div class="message ${messageClass}">
                        <div class="message-content">
                            ${content}
                            ${sender === 'ai' ? `<div class="timestamp">${timestamp}</div>` : ''}
                        </div>
                    </div>
                `;
                    chatBox.insertAdjacentHTML('beforeend', messageHTML);

                    scrollToBottom();
                }

                function scrollToBottom() {
                    chatBox.scrollTop = chatBox.scrollHeight;
                }

                function showTypingIndicator() {
                    const typingIndicatorHTML = `
                    <div id="typing-indicator" class="message ai-message">
                        <div class="message-content">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div>
                `;
                    chatBox.insertAdjacentHTML('beforeend', typingIndicatorHTML);
                    scrollToBottom();
                }

                function hideTypingIndicator() {
                    const typingIndicator = document.getElementById('typing-indicator');
                    if (typingIndicator) {
                        typingIndicator.remove();
                    }
                }
            });
        })();
