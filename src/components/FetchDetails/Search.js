export default class Search {
  constructor(url, keyword, page) {
    this.url = url;
    this.page = page;
    this.keyword = keyword;
  }

  loadAnime() {
    return new Promise((success, failure) => {
      //console.log(`${this.url}keyword=${this.keyword}&page=${this.page}`);
      fetch(`${this.url}keyword=${this.keyword}&page=${this.page}`)
        .then((html) => html.text())
        .then((htmlText) => {

          let fetch = require('fast-html-parser');
          
          let root = fetch.parse(htmlText);

          let wrapper = root.querySelector('.wpb_wrapper');

          let path = wrapper.childNodes[1].childNodes[2].childNodes;
          //console.log(path); 

          let animeData = [];

          for (let i=0; i<path.length; i++) {

            if (path[i].isWhitespace === true) continue;
            
            // Check childnodes[] are not undefined, if undefined continue 
            if( path[i].childNodes[1] === undefined ) continue;

            let episodeURL = path[i].childNodes[1].attributes.href;
            //console.log(episodeURL);

            let imageURL = path[i].childNodes[1].childNodes[1].childNodes[1].childNodes[1].attributes.src;
            //console.log(imageURL);

            let animeName = path[i].childNodes[1].childNodes[1].childNodes[1].childNodes[1].attributes.alt;

            let episodeName = path[i].childNodes[1].childNodes[3].structuredText;

            let episodeTime = path[i].childNodes[1].childNodes[5].structuredText;

            animeData.push({
              episodeURL: episodeURL,
              episodeName: episodeName,
              episodeImage: imageURL,
              episodeTime: episodeTime,
              animeName: animeName
            });
          }
          //console.log(animeData);
          success(animeData);
        });
    });
  }
}