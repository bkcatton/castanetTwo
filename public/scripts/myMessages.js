// Client facing scripts here
$(document).ready(function () {
  const $conversationsContainer = $('.all-conversations');
  const $threadsContainer = $('.conversations');
  const $singleConvHeader = `<h1>Messages - click to view conversations</h1>
        <table>
          <tr>
            <th>From</th>
            <th>Latest Message</th>
          </tr>`;
  const $singleConvFooter = `</table>`;
  const $messagerContainer = $('.messager');
  const $backToMessagesContainer = $('.back-to-messages');

  const renderSingleConversation = function (message) {
    const $distinctMessage = `<tr>
            <th><a > ${message.sender_id}</a></th>
            <th id="${message.sender_id}">${message.message_body}</th>
          </tr>`

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

  const renderOneThread = function (message) {
    const $distinctMessage = `<tr>
    <th>${message.sender_id}</th>
    <th>${message.message_body}</th>
    <th>${message.receiver_id}</th>
  </tr>`;
    $threadsContainer.append($distinctMessage);
  }

  const renderThreads = function (messages) {
    const $threadHeader = `
    <h3>Conversation with user id ${messages[0].sender_id}</h3>
    <table>
        <tr>
          <th>From</th>
        <th>Message</th>
         <th>To</th>
        </tr>`;
    $threadsContainer.append($threadHeader);
    for (let message of messages) {
      renderOneThread(message);
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
  $(".all-conversations").on("click", (e) => {
    console.log("this is in the onclick", e.target.id);
    localStorage.setItem("singleListingId", e.target.id);
    console.log("this is in local storage now:", localStorage.singleListingId);
    $conversationsContainer.empty();

    $.ajax({
      url: "http://localhost:8080/api/oneConversation",
      method: "GET",
      dataType: "json",
      data: { id: e.target.id || localStorage.singleListingId },
      success: (data) => {
        console.log("from our new data obj", data);
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


