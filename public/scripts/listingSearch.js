// Client facing scripts here

// Client facing scripts here
$(document).ready(function () {
  const $button = $(".search");
  const $topRow = $(".top-row");

  //listens for the search button click event

  $button.on("click", function (event) {
    console.log("this", $(this));
    event.preventDefault();
    $topRow.empty();

    // creates search html structure

    const $createSearchResults = function (listing) {
      localStorage.clear();

      $(".top-row").on("click", (e) => {
        console.log("this is in the onclick", e.target.id);
        localStorage.setItem("singleListingId", e.target.id);
      });
      const $listingContainer = `<article class="listing-container">
      <a name="imagelink" class="" href="/single_listing"><img class="img-pic" src='${
        listing.photo_url
      }' id='${listing.id}'/></a>
      ${
        listing.isactive === "false"
          ? `<img class="img-pic" src='https://github.com/bkcatton/castanetTwo/blob/master/public/images/Sold.png?raw=true'/>`
          : `<h3>Active</h3>`
      }
      <h3 class="desc">${listing.title}</h3>
      <h3 class="city">${listing.city}</h3>
      <h3 class="price">${listing.price}</h3>
      <button class="fave" id="${listing.id}"> Favorite </button>
      </article>`;
      return $listingContainer;
    };

    // appends the search results to the ejs

    const renderSearchResults = function (city) {
      const listings = city.city;

      for (let listing of listings) {
        const $item = $createSearchResults(listing);
        $(".top-row").append($item);
      }
    };

    // loads the search results

    const loadSearchResults = function () {
      const $inputCity = $(".input-city").val();
      let $inputPrice = $(".input-price").val();
      if ($inputPrice < 1) {
        $inputPrice = 10000000;
      }

      $.get(`http://localhost:8080/api/listingSearch`, {
        cityName: $inputCity,
        price: $inputPrice,
      }).then((data) => {
        renderSearchResults(data);
      });

      // $.ajax({
      //   url: `http://localhost:8080/api/listingSearch`,
      //   method: "GET",
      //   dataType: "json",
      //   data: { cityName: $inputCity, price: $inputPrice },
      //   success: (data) => {
      //     const $inputValue = $(".input-search").val();

      //     renderSearchResults(data);
      //   },
      //   error: (error) => {
      //     console.log("this request failed and this was the error", error);
      //   },
      // });
    };
    loadSearchResults();
  });
});
