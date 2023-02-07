import { videoStoreLimit } from '../../values.js';
export const storeVideo = (location) => {
  let watchedArr = [];
  let storedVideo = JSON.parse(localStorage.getItem('watched'));
  let video = location.video;

  if (video) {
    let parseLocation = video.replace(/.episode.+/g, '');
    
    if (storedVideo && storedVideo.length > 0 ) {
      let matchedVideo = storedVideo.some((value) => {
        return value.replace(/.episode.+/g, '') === parseLocation;
      });

      let removeSameVideo = storedVideo.filter((value) => {
        return value.replace(/.episode.+/g, '') !== parseLocation;
      });
      
      if (!matchedVideo) {
        if (storedVideo.length >= videoStoreLimit) {
          storedVideo.splice(-1, 1);
        }
        watchedArr.push(video, ...storedVideo);
      } else {
        if (storedVideo.length >= videoStoreLimit) {
          storedVideo.splice(-1, 1);
        }
        watchedArr.push(video, ...removeSameVideo);
      }
    } else {
      watchedArr.push(video);
    }
    localStorage.setItem('watched', JSON.stringify(watchedArr));
  }
}
