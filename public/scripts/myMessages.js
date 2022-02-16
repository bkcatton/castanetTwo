// Client facing scripts here
$(document).ready(function () {
  const $conversationsContainer = $('.all-conversations');
  const $threadsContainer = $('.conversations');
  const $singleConvHeader = `<h1>Messages - click to view conversations</h1>`;
  const $singleConvFooter = `</table>`;
  const $messagerContainer = $('.messager');
  const $backToMessagesContainer = $('.back-to-messages');

  const renderSingleConversation = function (message) {
    const $distinctMessage = `
            <div class="thread-box">
            <div>
            <strong>From User Id: <a >${message.sender_id}</strong></a>
            <p>${message.message_body}</p>
            </div>
            <div>
            <button class="view-thread" id="${message.sender_id}">View Thread</button>
            </div>
            </div>
          `;

    $conversationsContainer.append($distinctMessage);
  }

  const renderMessages = function (messages) {
    $conversationsContainer.append($singleConvHeader);
    for (let message of messages) {
      renderSingleConversation(message);
    }
    $conversationsContainer.append($singleConvFooter);
  };

  const loadMessages = function () {
    $.ajax({
      url: "http://localhost:8080/api/myMessages",
      method: "GET",
      dataType: "json",
      success: (data) => {
        renderMessages(data.data);
      },
      error: (error) => {
        console.log("this request failed and this was the error", error);
      },
    });
  }
  //first thing loaded to page - all distinct conversations
  if (!localStorage.singleListingId) {
    loadMessages();
  }
  if (localStorage.singleListingId) {
    $.ajax({
      url: "http://localhost:8080/api/oneConversation",
      method: "GET",
      dataType: "json",
      data: { id: localStorage.singleListingId },
      success: (data) => {
        console.log("from our new data obj", data);
        renderThreads(data.data);
      },
      error: (error) => {
        console.log("this request failed and this was the error", error);
      },
    });
  }

  const renderThreadLeft = function (message) {
    const $distinctMessageLeft = `
    <div class="bubble-message-left">
    From : ${message.sender_id} To: ${message.receiver_id}
    <div class="bubble-body">
    ${message.message_body}
    </div>
  </div>`;
    $threadsContainer.append($distinctMessageLeft);
  }
  const renderThreadRight = function (message) {
    const $distinctMessageRight = `
    <div class="bubble-message-right">
    From : ${message.sender_id} To: ${message.receiver_id}
    <div class="bubble-body">
    ${message.message_body}
    </div>
  </div>`;
    $threadsContainer.append($distinctMessageRight);
  }

  const renderThreads = function (messages) {
    const $threadHeader = `<h3>Conversation with user id ${messages[0].sender_id}</h3>`;
    $threadsContainer.append($threadHeader);
    for (let message of messages) {
      if (message.receiver_id === 3) {
        renderThreadRight(message);
      } else {
        renderThreadLeft(message);
      }
    }
    $threadsContainer.append($singleConvFooter);
    $messagerContainer.append(`<h4>Reply:
    </h4>
    <form id="${messages[0].sender_id}">
      <textarea type="text" id="reply-body" placeholder="Your Message Here"></textarea>
      <button id="deliver-reply">send message</button>
    </form>`);
    $messagerContainer.attr('id', `${messages[0].sender_id}`);
    $backToMessagesContainer.append(`<button>Back to Messages</button>`);
  }

  //when clicked this will empty page and render the clicked message thread
  $(document).on("click",".view-thread", (e) => {
    localStorage.setItem("singleListingId", e.target.id);
    $conversationsContainer.empty();

    $.ajax({
      url: "http://localhost:8080/api/oneConversation",
      method: "GET",
      dataType: "json",
      data: { id: e.target.id || localStorage.singleListingId },
      success: (data) => {
        renderThreads(data.data);
      },
      error: (error) => {
        console.log("this request failed and this was the error", error);
      },
    });

  });

  //when button is clicked, a text will be sent from logged in users phone number(twilio number) to
  //the recievers phone number - which is obtained from the first message they sent
  $(".messager").on("submit", (e) => {
    e.preventDefault();
    $textAreaValue = $('#reply-body').val();
    console.log("this is in the text area value", $textAreaValue);
    console.log("this is who are replying to", $messagerContainer.attr('id'));

    $.ajax({
      url: "http://localhost:8080/api/sendText",
      method: "GET",
      dataType: "json",
      data: {
        message: $textAreaValue,
        receiver_id: $messagerContainer.attr('id'),
        sender_id: 3,
      },
      success: (data) => {
        $threadsContainer.empty();
        $messagerContainer.empty();
        $backToMessagesContainer.empty();
        renderThreads(data.data);
      },
      error: (error) => {
        console.log("this request failed and this was the error", error);
      },
    });
  });

  $(".back-to-messages").on("click", (e) => {
    e.preventDefault();
    localStorage.setItem("singleListingId", "");
    $threadsContainer.empty();
    $messagerContainer.empty();
    $backToMessagesContainer.empty();
    loadMessages();
  });

});

