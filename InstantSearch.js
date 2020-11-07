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
    let delay;

      this.elements.input.addEventListener("input", () => {
      clearTimeout(delay);

      const query = this.elements.input.value;

      delay = setTimeout(() =>{
      if(query.lenght < 3) {
        this.populateResults([]);
        return;
      }

      this.performSearch(query).then(results => {
        this.populateResults(results);
      });
      },500);

    });

    this.elements.input.addEventListener("focus", () => {
      this.elements.resultContainer.classList.add("instant-search__results-containter--visible");
    });
    this.elements.input.addEventListener("blur", () => {
      this.elements.resultContainer.classList.remove("instant-search__results-containter--visible");
    });

}

/**
 * @param {Object[]} results
 */

  populateResults(){
    while (this.elements.resultContainer.firstChild){
      this.elements.resultContainer.removeChild(this.element.resultContainer.firstChild);
    }

    for (const result of results){
      this.element.resultContainer.appendChild(this.createResultElement(result));
    }

}

createResultElement(result) {
  const anchorElement = document.createElement("a");
  anchorElement.classList.add("instant-search__result");
  anchorElement.insertAdjacentHTML("afterbegin", this.options.templateFunction(result));

  if("href" in result){
    anchorElement.setAttribute("href", result.href);
  }
  return anchorElement;
}


    /**
     * @param {string} query Search query
     *@returns {Promise<Object[]>}
     */
    performSearch(query){
      const url = new URL(this.options.searchUrl.toString());
      url.searchParams.set(this.option.queryParam, query);
      this.setLoading(true);
      return fetch(url, {
        method:"get"
      }).then(response => {
        if(response.status !== 200){
          throw new Error("Something went wrong with the search!");
        }
        return response.json();
      }).then(responseData => {
        console.log(responseData);
        return this.options.responseParser(responseData);
      }).catch(error => {
        console.error(error);
        return [];
      }).finally(results => {
        this.setLoading(false);
        return results;
      });
    }
    /**
     * @param {boolean} b
     */
     setLoading(b){
       this.elements.main.classList.toggle("instant-search--loading",b);
     }

