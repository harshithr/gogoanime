class HomePagePagination {
  constructor (url, page) {
    this.url = url;
    this.page = page;
  }

  loadPagination = () => {
    return new Promise((success, failure) => {
      //console.log(`${this.url}?page=${this.page}`);
      fetch(`${this.url}?page=${this.page}`)
        .then(html => html.text())
        .then(htmlText => {
          const HTMLParser = require('fast-html-parser');
          
          let root = HTMLParser.parse(htmlText);

          let pagination = root.querySelector('.pagination');

          let page = pagination.childNodes[1].childNodes[1];
          
          let pageNum = [];
          for (let i=0; i<page.childNodes.length - 1 ; i++) {
            pageNum.push(page.childNodes[i].structuredText);
          }

          //console.log(pageNum );

          success(pageNum);
        });
    });
  }
}

export default HomePagePagination;