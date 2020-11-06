/**
*@typedef {Object} InstantSearchOptions
*@property {url} searchUrl
*@property {string} queryParam
*@property {Function} responseParser
*@property {Function} templateFunction
**/

class InstantSearch{
  /**
   * @param {HTMLElement} instantSearch
   *@param {InstantSearchOptions} options
   */
  constructor(instantSearch, options){
    this.options = options;
    this.element = {
      main: instantSearch,
      input: instantSearch.querySelector(".instant-search__input"),
      resultContainer: document.createElement("div")
    };
    this.elements.resultContainer.classList.add("instant-search__results-containter");
    this.elements.main.appendChild(this.elements.resultContainer);

    this.addListerners();
  }

  addListerners() {
    let delay:

    this.elements.input.addEventListener("input", () => {
      clearTimeout(delay):

      const query = this.elements.input.value;

      delay = setTimeout(() =>{
      consle.log(query);
      },500);

    });
}

  populateResults(){

  }


export default InstantSearch;
