
// Client facing scripts here
$(document).ready(function () {
  const $topRow = $(".top-row");
  const $link = $(".single-listing");

  console.log("from inside single listing", imagelink);

      $.ajax({
        url: `http://localhost:8080/api/singleListing`,
        method: "GET",
        dataType: "json",
        //data: { cityName: $inputCity, price: $inputPrice },
        success: (data) => {
          console.log("from inside success", $link.attr('id'));
          console.log("DATA", data);
          const $inputValue = $(".input-search").val();
        },
        error: (error) => {
          console.log("this request failed and this was the error", error);
        },
      });

});

