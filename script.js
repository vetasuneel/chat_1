$(document).ready(function() {
    // Toggle Chat Container
    $('#chat-icon').click(function() {
        $('#chat-container').fadeToggle();
        if ($('#chat-container').is(':visible')) {
            $('#user-input').focus();
            scrollToBottom();  // Ensure scroll position is correct
        }
    });

    // Close Chat Container
    $('#close-btn').click(function() {
        $('#chat-container').fadeOut();
    });

    // Send Message on Click
    $('#send-btn').click(function() {
        sendMessage($('#user-input').val().trim());
    });

    // Send Message on Enter Key
    $('#user-input').keypress(function(e) {
        if (e.which === 13) { // Enter key
            sendMessage($('#user-input').val().trim());
            return false;
        }
    });

    // Handle Predefined Input Buttons
    $('.predefined-btn').click(function() {
        const message = $(this).data('message');
        sendMessage(message);

        // Remove predefined inputs after selection
        $('#predefined-inputs').remove();
    });

    // Function to Send Message
    function sendMessage(userInput) {
        if (userInput === "") return;

        // Clear Input
        $('#user-input').val('');

        // Append User Message
        appendMessage('user', userInput);

        // AJAX Request to Backend
        $.ajax({
            url: '/chat',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ message: userInput }),
            success: function(response) {
                // Append AI Response
                appendMessage('ai', response.response);
                // Optionally append a link if provided
                if (response.link) {
                    appendMessage('ai', `<a href="${response.link}">${response.link}</a>`);
                }
                // Auto-scroll to Bottom
                scrollToBottom();
            },
            error: function() {
                // Handle Errors
                appendMessage('ai', 'Sorry, something went wrong. Please try again later.');
                scrollToBottom();
            }
        });
    }

    // Function to Append Message
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
        $('#chat-box').append(messageHTML);

        // Auto-scroll to Bottom
        scrollToBottom();
    }

    // Function to Scroll to Bottom of the Chat Box
    function scrollToBottom() {
        const chatBox = $('#chat-box');
        chatBox.scrollTop(chatBox.prop("scrollHeight"));
    }
});
