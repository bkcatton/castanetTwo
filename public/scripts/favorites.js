// Client facing scripts here
$(document).ready(function () {
  // loads the users favorites

  loadFavorites();

  // sets an event to remove a listing from a users favorites

  $(document).on("click", ".unfave", unFavorite);
});

// removes a listing from  users favorites

const unFavorite = function (event) {
  const id = this.id;

  $.post(`/api/favorites/${id}`).then((data) => {
    loadFavorites(data);
  });
};

// loads the users favorites to the ejs

const loadFavorites = function () {
  $.get("/api/favorites").then((data) => {
    renderFavorites(data);
  });
};

// creates an html element for the favorites page

const $createFavorite = function (listing) {
  localStorage.clear();

  $(".img-pic").on("click", (e) => {
    localStorage.setItem("singleListingId", e.target.id);
  });

  const $listingContainer = `<article class="listing-container">
  <div class="fave-div">
  <div class="fave-pic">
  <a name="imagelink" class="" href="/single_listing"><img class="img-pic" src='${
    listing.photo_url
  }' id='${listing.listing_id}'/></a>
  </div>
  <div class="fave-content">
  ${
    listing.isactive === "false"
      ? `<img class="sold-pic" src='https://github.com/bkcatton/castanetTwo/blob/master/public/images/Sold.png?raw=true'/>`
      : `<h3>Active</h3>`
  }
  <h3 class="city">City : ${listing.city}</h3>
  <h3 class="price">Asking Price : $${listing.price}</h3>
  </div>
  </div>

  <h3 class="desc">${listing.title}</h3>
<button class="fave unfave" id="${listing.fid}">Unfavorite</button>

</article>`;

  return $listingContainer;
};

// // appends the result of create favorites to the ejs

const renderFavorites = function (listings) {
  const array = listings.favorites;
  const $container = $(".top-row");
  $container.empty();
  for (let listing of array) {
    const $item = $createFavorite(listing);
    $container.append($item);
  }
};
