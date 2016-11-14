$(document).ready(main);

  var username = '';
  var socket;

  function main() {
    socket = io.connect();
    bindKeyEvent();
    bindIncomingMessage();
  }

  function bindKeyEvent() {
    $('.username input').keypress(onUserNameKeypress);
    $('.message-bar input').keypress(onChatMessageKeyPress);
  }

  function onUserNameKeypress(event){
    if(event.which == 13) {
    //  debugger;
      username = event.target.value;
      $('.modal').hide();
    }
  }

  function onChatMessageKeyPress(event) {
    var msg = event.target.value;

    if(event.which == 13 && msg !== '') {
        socket.emit('message', {
          message : msg,
          username : username
        });

        event.target.value = '';
        addMessage(msg, username, true);
        event.preventDefault();
        event.stopPropagation();
    } else if (event.which == 13 && msg == '') {
      event.preventDefault();
      event.stopPropagation();
    }

  }

  function bindIncomingMessage() {
    socket.on('message', function(data) {
      addMessage(data.message, data.username, false);
    });
  }

  function addMessage(msg, username, isMyMessage) {
    var container = $("#chat-container");
    var className;

    isMyMessage ? className = "message my-message" : className = "message";

    var msg = '<div class="' + className +'"><div class="msg-usr"> '+ username +'</div><div class="message-text">' + msg + '</div></div>';
    container.html(container.html() + msg);
  }
