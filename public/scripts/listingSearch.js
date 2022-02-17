$(document).ready(function () {
  const $button = $(".search");
  const $topRow = $(".top-row");

  //listens for the search button click event

  $button.on("click", function (event) {
    event.preventDefault();
    $topRow.empty();

    // creates search html structure

    const $createSearchResults = function (listing) {
      localStorage.clear();

      $(".top-row").on("click", (e) => {
        localStorage.setItem("singleListingId", e.target.id);
      });

      const $listingContainer = `<article class= "listing-container">
  <div class="index-div">
  <a name="imagelink" class="pic-anchor" href="/single_listing"><img class="img-pic" src='${
    listing.photo_url
  }' id='${listing.id}'/></a>
  <div class="info-div">
   <h3 class="price">Listing Price : $${listing.price}</h3>
   <h3 class="city">City : ${listing.city}</h3>

  ${
    listing.isactive === "false"
      ? `<img class="sold-pic" src='https://github.com/bkcatton/castanetTwo/blob/master/public/images/Sold.png?raw=true'/>`
      : `<h3 class="active">Active Listing</h3>`
  }

  </div>
  </div>
<h3 class="desc">${listing.title}</h3>
<button class="fave" id="${listing.id}"> Favorite </button>

</article>`;
      return $listingContainer;
    };

    // appends the search results to the ejs

    const renderSearchResults = function (city) {
      const listings = city.city;

      for (let listing of listings) {
        const $item = $createSearchResults(listing);
        $(".top-row").prepend($item);
      }
    };

    // loads the search results

    const loadSearchResults = function () {
      const $inputCity = $(".input-city").val();
      let $inputPrice = $(".input-price").val();
      let $minPrice = $(".input-min").val();
      console.log($minPrice);
      if ($inputPrice < 1) {
        $inputPrice = 10000000;
      }
      console.log($inputPrice);
      if (!$minPrice) {
        $minPrice = 0;
      }

      $.get(`/api/listingSearch`, {
        cityName: $inputCity,
        price: $inputPrice,
        minPrice: $minPrice,
      }).then((data) => {
        renderSearchResults(data);
      });
    };
    loadSearchResults();
  });
});
