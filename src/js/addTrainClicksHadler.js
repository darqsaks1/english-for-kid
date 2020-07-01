import { storageObject1 } from './index.js';
import { train } from './index.js';

export default function addTrainClicksHadler(e) {
  if (e.target.closest('.flip-card-front') && train) {
    storageObject1.forEach((el) => {
      if (e.target.closest('.flip-card-front').lastChild.innerText === el.word) {
        const elem = el;
        elem.clicks += 1;
        localStorage.setItem('statistic', JSON.stringify(storageObject1));
      }
    });
  }
}
