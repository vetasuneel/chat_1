(function() {
    // Inject CSS into the page
    const style = document.createElement('style');
    style.textContent = `
        * {
            box-sizing: border-box;
        }

        .chat-icon {
            position: fixed;
            bottom: 20px;
            right: 20px;
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
            z-index: 1000;
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

        .chat-icon:hover i {
            transform: scale(1.1);
        }

        .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 350px;
            max-width: 90%;
            height: fit-content;
            background-color: #ffffff;
            border-radius: 15px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            display: none;
            flex-direction: column;
            z-index: 1001;
            transform: translateY(100%);
            opacity: 0;
            transition: transform 0.4s ease, opacity 0.4s ease;
        }

        .chat-container.open {
            display: flex;
            transform: translateY(0);
            opacity: 1;
        }

        .chat-container.close {
            transform: translateY(100%);
            opacity: 0;
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
            height: 350px;
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
            height: 30px;
            margin-top: 10px;
        }

        .dot {
            height: 10px;
            width: 10px;
            margin: 0 5px;
            background-color: #333;
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
        <div class="chat-icon" id="chat-icon">
            <i class="fas fa-comments"></i>
        </div>

        <div class="chat-container" id="chat-container">
            <div class="chat-header">
                <center><img src="https://raw.githubusercontent.com/vetasuneel/chatbot_test_14/main/idea_pad.png" style="width: 120px; text-align: center;" alt="Header Image"></center>
                <span class="close-btn" id="close-btn">&times;</span>
            </div>
            <div id="chat-box" class="chat-box">
                <div class="predefined-inputs" id="predefined-inputs">
                    <div class="predefined-btn" data-message="What are your hours?">What are your hours?</div>
                    <div class="predefined-btn" data-message="What services do you offer?">What services do you offer?</div>
                    <div class="predefined-btn" data-message="Can I make a reservation?">Can I make a reservation?</div>
                </div>
            </div>
            <div id="typing-indicator" class="typing-indicator" style="display: none;">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <div class="chat-input">
                <input type="text" id="user-input" placeholder=" Type your message...">
                <button id="send-btn">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // JavaScript functionality
    document.addEventListener('DOMContentLoaded', function() {
        const chatIcon = document.getElementById('chat-icon');
        const chatContainer = document.getElementById('chat-container');
        const closeBtn = document.getElementById('close-btn');
        const sendBtn = document.getElementById('send-btn');
        const userInput = document.getElementById('user-input');
        const typingIndicator = document.getElementById('typing-indicator');

        chatIcon.addEventListener('click', function() {
            if (chatContainer.classList.contains('open')) {
                chatContainer.classList.remove('open');
                chatContainer.classList.add('close');
                setTimeout(() => {
                    chatContainer.style.display = 'none';
                }, 400); // Match the duration of the close animation
            } else {
                chatContainer.style.display = 'flex';
                chatContainer.classList.remove('close');
                chatContainer.classList.add('open');
                userInput.focus();
                scrollToBottom();
            }
        });

        closeBtn.addEventListener('click', function() {
            chatContainer.classList.remove('open');
            chatContainer.classList.add('close');
            setTimeout(() => {
                chatContainer.style.display = 'none';
            }, 400); // Match the duration of the close animation
        });

        sendBtn.addEventListener('click', function() {
            sendMessage(userInput.value.trim());
        });

        userInput.addEventListener('keypress', function(e) {
            if (e.which === 13) {
                sendMessage(userInput.value.trim());
                return false;
            }
        });

        document.querySelectorAll('.predefined-btn').forEach(function(button) {
            button.addEventListener('click', function() {
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
            typingIndicator.style.display = 'flex';

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
                typingIndicator.style.display = 'none';
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
                typingIndicator.style.display = 'none';
                appendMessage('ai', 'Sorry, something went wrong. Please try again later.');
                scrollToBottom();
            });
        }

        function appendMessage(sender, content) {
            const chatBox = document.getElementById('chat-box');
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
            const chatBox = document.getElementById('chat-box');
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    });
})();
