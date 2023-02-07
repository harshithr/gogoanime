class SearchPagination {
  constructor (url, keyword, page) {
    this.url = url;
    this.page = page;
    this.keyword = keyword;
  }

  loadPagination = () => {
    return new Promise((success, failure) => {
      //console.log(`${this.url}keyword=${this.keyword}&page=${this.page}`);
      fetch(`${this.url}keyword=${this.keyword}&page=${this.page}`)
        .then(html => html.text())
        .then(htmlText => {
          const HTMLParser = require('fast-html-parser');
          
          let root = HTMLParser.parse(htmlText);

          let pagination = root.querySelector('.pagination');
          
          if (pagination.childNodes[1].childNodes[1] !== undefined) {
            let page = pagination.childNodes[1].childNodes[1];
            
            let pageNum = [];
            for (let i=0; i<page.childNodes.length - 1 ; i++) {
              pageNum.push(page.childNodes[i].structuredText);
            }

            //console.log(pageNum );

            success(pageNum);
          } else {
            console.log('Pagination did not render');
          }
        });
    });
  }
}

export default SearchPagination;