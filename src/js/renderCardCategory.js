import cards from '../../data/cards.js';

export default function renderCardCategory(i) {
  function renderCategoryNine() {
    const containerWrapper = document.querySelector('.container-wrapper');
    if (i !== 8) {
      const cardSection = document.createElement('a');
      cardSection.hash = `${cards[i]}`;
      cardSection.className = 'cardSection';
      containerWrapper.append(cardSection);
      const tittle = document.createElement('h3');
      tittle.innerText = `${cards[0][i]}`;
      cardSection.append(tittle);
      const imgSection = document.createElement('img');
      imgSection.className = 'imgSection';
      imgSection.src = `data/${cards[i + 1][i].image}`;
      cardSection.append(imgSection);
      cardSection.setAttribute('href', `#cards${[i]}`);
    }
  }
  function renderCategoryFromOneToSeven() {
    const containerWrapper = document.querySelector('.container-wrapper');
    if (i === 8) {
      const cardSection = document.createElement('a');
      cardSection.hash = `${cards[i]}`;
      cardSection.className = 'cardSection';
      containerWrapper.append(cardSection);
      const tittle = document.createElement('h3');
      tittle.innerText = `${cards[0][i]}`;
      cardSection.append(tittle);
      const imgSection = document.createElement('img');
      imgSection.className = 'imgSection';
      imgSection.src = `data/${cards[i + 1][i - 1].image}`;
      cardSection.append(imgSection);
      cardSection.setAttribute('href', `#cards${[i]}`);
    }
  }
  renderCategoryFromOneToSeven();
  renderCategoryNine();
}
