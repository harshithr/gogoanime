export default class FetchHomePage {

  constructor(url, page) {
    this.url = url;
    this.page = page;
  }

  loadAnime = () => {
    return new Promise((success, failure) => {
      fetch(`${this.url}?page=${this.page}`)
        .then(html => html.text())
        .then(htmlText => {
          const HTMLParser = require('fast-html-parser');
          
          let root = HTMLParser.parse(htmlText);
          
          let recentAddedSUB = root.querySelector('.wpb_wrapper');

          let path = recentAddedSUB.childNodes[1].childNodes[2].childNodes;
          //console.log(path);

          const animeData = [];

          let entryCount = 0;

          // checks whether path[61] from path array is undefined, if removed it results in error
          if(path[61].childNodes[1] === undefined) {
            path.remove(path[61]);
          }

          for (let i=0; i<path.length; i++) {
            const loop = path[i];
            if (loop.isWhitespace === true) continue;
            entryCount++;

            // episode url
            let episodeURLFetch = loop.childNodes[1].attributes.href;
            let episodeURL = `${episodeURLFetch}`;
            //console.log(episodeURL);

            // episode image
            let imgURLFetch = loop.querySelectorAll('.img');
            let imgURL = imgURLFetch[0].childNodes[1].childNodes[1].attributes.src;
            //console.log(imgURL);

            let nameFetch = loop.querySelector('.name');
            let episodeName = nameFetch.structuredText;
            //console.log(episodeName);

            let time = loop.querySelector('.meta');
            let publishTime = time.structuredText;
            //console.log(time);

            animeData.push({
              name: episodeName,
              img: imgURL,
              url: episodeURL,
              time: publishTime
            });
          }
          success([ animeData, entryCount ]);
          
        })
        .catch(err => {
          console.log(err);
          failure(err);
        });

    });
  }
} 