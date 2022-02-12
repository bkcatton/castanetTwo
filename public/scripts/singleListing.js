// Client facing scripts here
$(document).ready(function () {
  // const $change = $('#target');

  $topRow.append("<p>Hello</p>");
  $.ajax({
    url: "http://localhost:8080/api/singleListing",
    method: "GET",
    dataType: "json",
    success: (data) => {
      const dataUser = data["users"][0];
      $topRow.append(`<p>${dataUser.name}</p>`);
      console.log(
        "this request succeeded and here's the data",
        data["users"][0]
      );
    },
    error: (error) => {
      console.log("this request failed and this was the error", error);
    },
  });
});