import InstantSearch from "./InstantSearch.js"

const searchUser = document.querySelector("#searchServices");
const InstantSearchServices = new InstantSearch(searchUsers,{
  searchUrl: new URL("/search.php", window.location.origin),
  queryParam : "q",
  responseParser: (responseData) => {
    return responseData.results;
  },
  templateFunction: (result) => {
    return `
    <div class="instant-search__title">${result.firstName} ${result.lastName}</div>
    <p class="instant-search__para">${result.occupation}</p>
    `;
  }
} );
