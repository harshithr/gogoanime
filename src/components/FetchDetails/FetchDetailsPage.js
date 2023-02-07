export default class FetchDetailsPage {
  constructor (url) {
    this.url = url;
  }

  loadAnime() {
    return new Promise((success, failure) => {
      //console.log(this.url);
      fetch(this.url)
        .then(html => html.text())
        .then(htmlText => {
          const HTMLParser = require('fast-html-parser');
          const root = HTMLParser.parse(htmlText);

          const fetchRoot = root.querySelector('.video-info');
          //console.log(fetchRoot);

          const episodeName = fetchRoot.childNodes[1].childNodes[1].rawText;
          //console.log(episodeName);

          const fetchVideo = fetchRoot.querySelector('.play-video');
          const videoIframe = fetchVideo.childNodes[1].attributes.src;
          //console.log(videoIframe);

          const fetchVideoDetails = fetchRoot.querySelector('.video-details');
          const videoDetailName = fetchVideoDetails.childNodes[1].structuredText;
          const videoSummary = fetchVideoDetails.childNodes[3].structuredText;
          
          let fetchEpisodes = fetchRoot.querySelector('.listing').childNodes;

          //console.log(fetchEpisodes);
          const animeDetailsData = [];
          for (let i=0; i<fetchEpisodes.length; i++ ) {
            if (fetchEpisodes[i].attributes === undefined) continue;
            if (fetchEpisodes[i].attributes.class === 'clr') {
              fetchEpisodes.remove(fetchEpisodes[i]);
            }
          }

          
          let episodeURLs= [];
          let episodeNumber= [];
          

          //console.log(fetchEpisodes);
          for (let i=0; i<fetchEpisodes.length; i++) {
            let loop = fetchEpisodes[i];
            if(loop.isWhitespace === true) continue;

            let episodeURL = loop.childNodes[1].attributes.href;
            //console.log(episodeURL);
            
            episodeURLs.push(episodeURL);
          }

          for (let i=episodeURLs.length; i>0; i--) {
            episodeNumber.push(i);
          }
          //console.log(episodes);


          animeDetailsData.push({
            episodeURL: episodeURLs,
            episodeNumber: episodeNumber,
            episodeName: episodeName,
            videoDetailName: videoDetailName,
            videoSummary: videoSummary,
            videoIframe: videoIframe
          });

          success(animeDetailsData);
        })
        .catch((err) => {
          console.log(err);
          failure(err);
        });
    });
  }
}