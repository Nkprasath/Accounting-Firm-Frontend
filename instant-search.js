import InstantSearch from "./InstantSearch.js"

const searchUser = document.querySelector("#searchServices");
const InstantSearchServices = new InstantSearch(searchUsers,{
  searchUrl: new URL("/search.php", window.location.origin),
  queryParam = 'q',
  resultParser: () => {},
  templateFunction: () => {}
} );
