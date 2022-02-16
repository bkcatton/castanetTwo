// Client facing scripts here
$(document).ready(function () {
  // const $topRow = $(".top-row");
  // const $form = $(".isActiveForm");
  // $(document).on("click", ".thisone", function (e) {
  //   console.log("this one target", event.target);
  //   console.log("did it work");
  // });
  $.delete = function (url, data, callback, type) {
    if ($.isFunction(data)) {
      (type = type || callback), (callback = data), (data = {});
    }
    return $.ajax({
      url: url,
      type: "DELETE",
      success: callback,
      data: data,
      contentType: type,
    });
  };

  const $addListing = function (listing) {
    localStorage.clear();

    $(".top-row").on("click", (e) => {
      console.log("this is in the onclick", e.target.id);
      localStorage.setItem("singleListingId", e.target.id);
    });
    // console.log("kjhfgkjhdfsgkjhdfsgkj", listing);
    const $listingContainer = `<article class="listing-container">
    <a name="imagelink" class="" href="/single_listing"><img class="img-pic" src='${
      listing.photo_url
    }' id='${listing.id}'/></a>
    ${
      listing.isactive === "false"
        ? `<img class="img-pic" src='https://github.com/bkcatton/castanetTwo/blob/master/public/images/Sold.png?raw=true'/>`
        : `<h3>Active</h3>`
    }
    <h1 class="price">$${listing.price}</h1>
    <h2 class="price">${listing.city}</h2>
    <h3 class="price">${listing.title}</h3>
    <form id="sold-form" method="POST">
    <button id="${
      listing.id
    }" type="submit" class="button-19">  Mark Sold! </button>
    </form>
    <form id="button-form" method="POST">
    <button id="${
      listing.id
    }" type="submit" class="button-36"> Delete Listing </button>
    </form>
    <br />
    </article>`;

    return $listingContainer;
  };

  const renderListing = function (myListings) {
    const array = myListings.myListings;
    const container = $(".top-row");
    container.empty();
    for (let listing of array) {
      const $item = $addListing(listing);
      container.prepend($item);
    }
  };
  const loadListings = function () {
    $.get("/api/myListings")
      .then((data) => {
        console.log("loaded");
        renderListing(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  loadListings();

  $(document).on("click", "#button-form", function (event) {
    console.log("this in here", $(this)[0]);

    console.log("the target", event.target);
    event.preventDefault();
    const id = event.target.id;
    console.log("id =", id);

    $.delete(`/api/myListings/${id}`).then((data) => {
      console.log("deleted", data);
      loadListings();
    });
  });

  $(document).on("click", "#sold-form", function (event) {
    console.log("the target", event.target);
    event.preventDefault();
    const id = event.target.id;
    console.log("id =", id);

    $.post(`/api/myListings/${id}`).then((data) => {
      console.log(data);
      loadListings();
    });
    // $.post({
    //   url: "/api/myListings",
    //   method: "POST",
    //   dataType: "json",
    //   data: { id: event.target.id },
    //   success: (data) => {
    //     console.log("from our new data obj", data);
    //     renderListing(data.listing);
    //   },
    //   error: (error) => {
    //     console.log("this request failed and this was the error", error);
    //   },
    // });
  });
});
