import { downloadLink } from '../../values.js';
export default class Search {
  constructor(url) {
    this.url = url;
  }

  loadAnime() {
    return new Promise((success, failure) => {
      fetch(`${this.url}`)
        .then((html) => html.text())
        .then((htmlText) => {

          let fetch = require('fast-html-parser');
          
          let root = fetch.parse(htmlText);

          let iframe = root.querySelector('.play-video');

          let fetchedIframe = iframe.childNodes[1].attributes.src;

          let iframeData = fetchedIframe.replace("//streamani.net/streaming.php", `${downloadLink}`);

          success(iframeData);
        });
    });
  }
}