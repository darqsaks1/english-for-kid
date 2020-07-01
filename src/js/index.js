
import cards from '../../data/cards.js';
import * as renderCardCategoryJs from './renderCardCategory.js';
import renderWrapper from './domElements.js';

export const storageObject1 = JSON.parse(localStorage.getItem('statistic'));

renderWrapper();
let train = true;
const containerWrapper = document.querySelector('.container-wrapper');
let game = false;
export default function addPlayAudioOnClick(e) {
  if (e.target.closest('.flip-card')) {
    if (!game) {
      const audio = new Audio(e.target.closest('.flip-card').getAttribute('data-audio'));
      audio.play();
    }
  }
}
const checkbox = document.getElementById('nav-toggle');
containerWrapper.addEventListener('click', () => {
  if (checkbox.checked) {
    checkbox.checked = false;
  }
});
function addTrainClicksHadler(e) {
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

function renderCategory() {
  for (let i = 0; i < cards[0].length; i += 1) {
    renderCardCategoryJs.default(i);
  }
}
renderCategory();
function renderCards(event, isMenu = false) {
  const cardSectionParent = isMenu ? event.target : event.target.closest('.cardSection');
  function createReverse() {
    const reverse = document.createElement('img');
    reverse.src = 'data/img/otherImages/1330172.svg';
    reverse.className = 'reverseImg';
    return reverse;
  }
  function createScene() {
    const scene = document.createElement('div');
    scene.className = 'flip-card';
    containerWrapper.append(scene);
    return scene;
  }
  function createReverseDiv(scene, reverse) {
    const reverseInner = document.createElement('div');
    scene.appendChild(reverseInner);
    reverseInner.appendChild(reverse);
    return reverseInner;
  }
  function createCardBack(card, imgCard) {
    const cardBack = document.createElement('div');
    cardBack.className = 'flip-card-back';
    card.append(cardBack);
    cardBack.append(imgCard);
    return cardBack;
  }

  function createRussianCard(num, i, cardBack) {
    const russianTittleCard = document.createElement('h3');
    russianTittleCard.innerText = `${cards[num + 1][i].translation}`;
    russianTittleCard.className = 'img-display';
    cardBack.append(russianTittleCard);
  }

  function createEnglishCard(num, i, cardFace) {
    const englishTittleCard = document.createElement('h3');
    englishTittleCard.className = 'englishTitle';
    englishTittleCard.innerText = `${cards[num + 1][i].word}`;
    cardFace.appendChild(englishTittleCard);
  }

  function createImgCard(num, i, cardFace) {
    const imgCard = document.createElement('img');
    imgCard.className = 'imgSection';
    imgCard.src = `data/${cards[num + 1][i].image}`;
    cardFace.appendChild(imgCard.cloneNode(true));
    return imgCard;
  }

  function createCardFaceDiv(card) {
    const cardFace = document.createElement('div');
    cardFace.className = 'flip-card-front';
    card.append(cardFace);
    return cardFace;
  }

  function createFlipCard(scene) {
    const card = document.createElement('div');
    card.className = 'flip-card-inner';
    scene.appendChild(card);
    return card;
  }
  function addMouseLeave() {
    document.querySelectorAll('.flip-card-inner').forEach((card) => {
      card.addEventListener('mouseleave', () => {
        if (card.classList.contains('is-flipped')) {
          card.classList.remove('is-flipped');
        }
      });
    });
  }
  function addEventClickReverse(reverseInner, card) {
    reverseInner.addEventListener('click', () => {
      card.classList.add('is-flipped');
    });
  }

  function createButtonPlay() {
    const button = document.createElement('button');
    button.className = 'button-play display';
    containerWrapper.appendChild(button);
    button.innerText = 'PLAY GAME';
  }

  function getAudioAttribute(scene, num, i) {
    scene.setAttribute('data-audio', `data/${cards[num + 1][i].audioSrc}`);
  }
  function constPlayMode() {
    const buttonPlay = document.querySelector('.button-play');
    const reverseImg = document.querySelectorAll('.reverseImg');
    const switcher = document.querySelector('.onoffswitch-inner');
    const cardBackGround = document.querySelectorAll('.flip-card-inner');
    const englishTittleCard = document.querySelectorAll('.englishTitle');
    const bigImg = document.querySelectorAll('.imgSection');
    const audioPlay = document.querySelectorAll('.flip-card');
    const inputChecked = document.querySelector('.onoffswitch-checkbox');
    return {
      switcher,
      cardBackGround,
      englishTittleCard,
      buttonPlay,
      reverseImg,
      bigImg,
      inputChecked,
      audioPlay,
    };
  }
  function checkedMethods(cardBackGround, englishTittleCard, buttonPlay, reverseImg, bigImg) {
    cardBackGround.forEach((el) => el.classList.add('purpleBackground'));
    englishTittleCard.forEach((el) => el.classList.add('oppasity'));
    buttonPlay.classList.remove('display');
    reverseImg.forEach((el) => el.classList.add('display'));
    bigImg.forEach((el) => el.classList.add('big-width-img'));
    game = true;
  }
  function notCheckedMethods(buttonPlay, audioPlay,
    cardBackGround, englishTittleCard,
    reverseImg, bigImg, num) {
    buttonPlay.classList.remove('round');
    audioPlay.forEach((el) => el.classList.remove('correct-card'));
    cardBackGround.forEach((el) => el.classList.remove('purpleBackground'));
    englishTittleCard.forEach((el) => el.classList.remove('oppasity'));
    buttonPlay.classList.add('display');
    reverseImg.forEach((el) => el.classList.remove('display'));
    bigImg.forEach((el) => el.classList.remove('big-width-img'));
    game = false;
    for (let i = 0; i < cards[num + 1].length; i += 1) {
      [...audioPlay][i].setAttribute('data-audio', `data/${cards[num + 1][i].audioSrc}`);
    }
  }
  function createPlayMode(num) {
    createButtonPlay();
    const {
      switcher, cardBackGround,
      englishTittleCard, buttonPlay, reverseImg,
      bigImg, inputChecked, audioPlay,
    } = constPlayMode();
    switcher.addEventListener('click', () => {
      if (inputChecked.checked) {
        train = false;
        checkedMethods(cardBackGround, englishTittleCard,
          buttonPlay, reverseImg, bigImg);
      } else {
        train = true;
        notCheckedMethods(buttonPlay,
          audioPlay, cardBackGround, englishTittleCard,
          reverseImg, bigImg, num);
      }
      function backToMainPage() {
        const restart = document.createElement('div');
        restart.className = 'button-play1';
        restart.innerText = 'main page';
        switcher.replaceWith(restart);
        restart.addEventListener('click', () => {
          document.location.reload(true);
        });
      }
      function getAudioGame(audioPlay1) {
        const audioContainer = [];
        const emptyArray = [];
        const word = [];
        audioPlay1.forEach((el) => emptyArray.push(el.getAttribute('data-audio')));
        emptyArray.sort(() => Math.random() - 0.5);
        word.push(emptyArray.pop());
        const audioFirst = new Audio(word[0]);
        audioFirst.play();
        containerWrapper.addEventListener('click', (e) => {
          if (e.target.classList.contains('round')) {
            const audioRepeat = new Audio(audioContainer[0]);
            audioRepeat.play();
          }
        });
        audioContainer.push(word.pop());
        return { emptyArray, audioContainer, word };
      }
      containerWrapper.addEventListener('click', (e) => {
        if (e.target === buttonPlay && !e.target.classList.contains('round')) {
          buttonPlay.classList.add('round');
          backToMainPage();
          for (let i = 0; i < cards[num + 1].length; i += 1) {
            [...audioPlay][i].setAttribute('data-audio', `data/${cards[num + 1][i].audioSrc}`);
            game = true;
          }
          const { emptyArray, audioContainer, word } = getAudioGame(audioPlay);

          const starsContainer = document.createElement('div');
          starsContainer.className = 'stars-container';
          containerWrapper.prepend(starsContainer);
          let error = 0;
          const errorWin = function noErrorsWin() {
            const successPop = document.createElement('div');
            successPop.className = 'popup';
            const audioSucces1 = new Audio('data/audio/success.mp3');
            audioSucces1.play();
            containerWrapper.append(successPop);
            setTimeout(() => {
              document.location.reload(true);
            }, 4000);
          };
          const badGame = function badGameHaveErrors(errorOnes) {
            const notSuccessPop = document.createElement('div');
            const erorrsDiv = document.createElement('h2');
            erorrsDiv.className = 'error-h';
            erorrsDiv.innerText = `${errorOnes} errors`;
            notSuccessPop.append(erorrsDiv);
            notSuccessPop.className = 'popup-not';
            const audioSucces12 = new Audio('data/audio/failure.mp3');
            audioSucces12.play();
            containerWrapper.append(notSuccessPop);
            containerWrapper.append(`${errorOnes}`);
            setTimeout(() => {
              document.location.reload(true);
            }, 4000);
          };
          const starsCont = function srarsContainer() {
            const starsCorrectContainer = document.createElement('div');
            const starsNotCorrectContainer = document.createElement('div');
            const starCorrect = document.createElement('img');
            starCorrect.src = 'data/img/star-win.svg';
            starsCorrectContainer.append(starCorrect);
            const starNotCorrect = document.createElement('img');
            starNotCorrect.src = 'data/img/star.svg';
            starsNotCorrectContainer.append(starNotCorrect);
            return { starsCorrectContainer, starsNotCorrectContainer };
          };
          containerWrapper.addEventListener('click', (eventOne) => {
            if (emptyArray.length === 0 && error === 0) {
              errorWin();
            }
            if (emptyArray.length === 0 && error !== 0) {
              badGame(error);
            }
            const { starsCorrectContainer, starsNotCorrectContainer } = starsCont();

            if (eventOne.target.closest('.flip-card') && game && !eventOne.target.closest('.flip-card').classList.contains('correct-card')) {
              if (eventOne.target.closest('.flip-card').getAttribute('data-audio') === audioContainer[0] && emptyArray.lenght !== 0) {
                const audioSucces = new Audio('data/audio/correct.mp3');
                eventOne.target.closest('.flip-card').classList.add('correct-card');
                audioSucces.play();
                audioContainer.pop();
                word.push(emptyArray.pop());
                audioContainer.push(word.pop());

                const nextAudio = new Audio(audioContainer[0]);
                nextAudio.play();
                starsContainer.append(starsCorrectContainer);

                const guessClick = function addGuessClick(eventClick) {
                  if (eventClick.target.closest('.flip-card-front')) {
                    storageObject1.forEach((el) => {
                      if (audioContainer[0] === `data/${el.srcAudio}`) {
                        const obj = el;
                        obj.guess += 1;

                        if (obj.guess > 0 && obj.mistakes === 0) {
                          obj.percent = 0;
                        } else if (obj.guess === 0 && obj.mistakes > 0) {
                          obj.percent = 100;
                        } else {
                          obj.percent = Math.floor((obj.mistakes * 100)
                          / (obj.mistakes + obj.guess));
                        }
                        localStorage.setItem('statistic', JSON.stringify(storageObject1));
                      }
                    });
                  }
                };
                guessClick(eventOne);
              } else {
                const audioSucces = new Audio('data/audio/error.mp3');
                starsContainer.append(starsNotCorrectContainer);
                audioSucces.play();

                const mistake = function mistakes(addMistake) {
                  if (addMistake.target.closest('.flip-card')) {
                    if (addMistake.target.closest('.flip-card').getAttribute('data-audio') !== audioContainer[0]) {
                      storageObject1.forEach((el) => {
                        if (audioContainer[0] === `data/${el.srcAudio}`) {
                          const obj = el;
                          obj.mistakes += 1;

                          if (obj.guess > 0 && obj.mistakes === 0) {
                            obj.percent = 0;
                          } else if (obj.guess === 0 && obj.mistakes > 0) {
                            obj.percent = 100;
                          } else {
                            obj.percent = Math.floor((obj.mistakes * 100)
                             / (obj.mistakes + obj.guess));
                          }
                          localStorage.setItem('statistic', JSON.stringify(storageObject1));
                        }
                      });
                    }
                  }
                };
                mistake(eventOne);
                error += 1;
              }
            }
          });
        }
      });
    });
  }
  if (cardSectionParent) {
    const cardHref = cardSectionParent.getAttribute('href');
    const num = parseInt(cardHref.match(/\d+/), 10);
    document.querySelectorAll('.cardSection').forEach((element) => {
      element.remove();
    });
    for (let i = 0; i < cards[num + 1].length; i += 1) {
      const reverse = createReverse();
      const scene = createScene();
      const reverseInner = createReverseDiv(scene, reverse);
      const card = createFlipCard(scene);
      const cardFace = createCardFaceDiv(card);
      const imgCard = createImgCard(num, i, cardFace);
      createEnglishCard(num, i, cardFace);
      const cardBack = createCardBack(card, imgCard);
      createRussianCard(num, i, cardBack);
      addMouseLeave();
      addEventClickReverse(reverseInner, card);
      getAudioAttribute(scene, num, i);
    }
    createPlayMode(num);
  }
}
containerWrapper.addEventListener('click', (e) => {
  if (e.target.closest('.flip-card-inner')) {
    addTrainClicksHadler(e);
  }
});


containerWrapper.addEventListener('click', (event) => renderCards(event));
containerWrapper.addEventListener('click', (event) => addPlayAudioOnClick(event));

const statsArray = [];
function stats() {
  for (let i = 1; i < cards[0].length + 1; i += 1) {
    for (let j = 0; j < cards[i].length; j += 1) {
      const obj = {};
      obj.category = cards[0][i - 1];
      obj.word = cards[i][j].word;
      obj.translation = cards[i][j].translation;
      obj.clicks = 0;
      obj.mistakes = 0;
      obj.guess = 0;
      obj.percent = 0;
      obj.srcAudio = cards[i][j].audioSrc;
      statsArray.push(obj);
    }
  }
  localStorage.setItem('statistic', JSON.stringify(statsArray));
}
stats();


const menu = document.querySelector('.menu-ul');

function MenuLinkEvent(event) {
  if (event.target.closest('.menu-link1')) {
    document.querySelectorAll('.flip-card').forEach((element) => {
      element.remove();
    });
    if (document.querySelector('.buttonResetTable')) {
      document.querySelector('.buttonResetTable').remove();
    }
    if (checkbox.checked) {
      checkbox.checked = false;
    }
    if (document.querySelector('.table-style')) {
      document.querySelector('.table-style').remove();
    }
    if (document.querySelector('.stars-container')) {
      document.querySelector('.stars-container').remove();
    }
    document.querySelector('.onoffswitch').classList.remove('display');
    if (document.querySelector('.button-play')) {
      document.querySelector('.button-play').remove();
    }
    renderCards(event, true);
  }
}
function menuLinkManePageEvent(event) {
  if (event.target.closest('.menu-link1Main')) {
    document.location.reload(true);
  }
}
function menuLinkTableEvent() {
  document.querySelectorAll('.flip-card').forEach((element) => {
    element.remove();
  });
  if (checkbox.checked) {
    checkbox.checked = false;
  }
  document.querySelectorAll('.cardSection').forEach((element) => {
    element.remove();
  });
  if (document.querySelector('.table-style')) {
    document.querySelector('.table-style').remove();
  }
  if (document.querySelector('.buttonResetTable')) {
    document.querySelector('.buttonResetTable').remove();
  }
  if (document.querySelector('.stars-container')) {
    document.querySelector('.stars-container').remove();
  }
  if (document.querySelector('.onoffswitch')) {
    document.querySelector('.onoffswitch').classList.add('display');
  }
  if (document.querySelector('.button-play')) {
    document.querySelector('.button-play').classList.add('display');
  }
}
menu.addEventListener('click', (event) => {
  MenuLinkEvent(event);
  menuLinkManePageEvent(event);
  if (event.target.closest('.menu1-table')) {
    menuLinkTableEvent();
    // if (document.querySelector)
    const buttonResetTable = document.createElement('div');
    buttonResetTable.className = 'buttonResetTable';
    buttonResetTable.innerText = 'reset';
    const wrapperTable = document.createElement('div');
    wrapperTable.className = 'wrapper-table';
    containerWrapper.append(buttonResetTable);
    containerWrapper.append(wrapperTable);

    const fullTable = document.createElement('table');
    fullTable.className = 'table-style';
    wrapperTable.append(fullTable);
    const tHead = document.createElement('thead');
    fullTable.append(tHead);
    const tBody = document.createElement('tbody');
    fullTable.appendChild(tBody);

    const renderTable = function renderTableHeader() {
      for (let i = 0; i < 7; i += 1) {
        const th = document.createElement('th');
        th.className = 'th';
        th.setAttribute('scope', 'col');
        tHead.append(th);
        switch (i) {
          case 0:
            th.innerText = 'Category';
            break;
          case 1:
            th.innerText = 'Word';
            break;
          case 2:
            th.innerText = 'Translation';
            break;
          case 3:
            th.innerText = 'Train clicks';
            break;
          case 4:
            th.innerText = 'Num of guess';
            break;
          case 5:
            th.innerText = 'Mistakes';
            break;
          case 6:
            th.innerText = '% of mistakes';
            break;
          default:
        }
      }
    };
    const renderTableBod = function renderTableBody() {
      for (let i = 0; i < statsArray.length; i += 1) {
        const tr = document.createElement('tr');

        tr.className = 'tr';
        tBody.append(tr);
        for (let j = 0, size = Object.keys(storageObject1[i]).length; j < size; j += 1) {
          const td = document.createElement('td');
          td.className = 'td';

          switch (j) {
            case 0:
              td.innerText = storageObject1[i].category;
              tr.append(td);
              break;
            case 1:
              td.innerText = storageObject1[i].word;
              tr.append(td);
              break;
            case 2:
              td.innerText = storageObject1[i].translation;
              tr.append(td);
              break;
            case 3:
              td.innerText = storageObject1[i].clicks;
              tr.append(td);
              break;
            case 4:
              td.innerText = storageObject1[i].guess;
              tr.append(td);
              break;
            case 5:
              td.innerText = storageObject1[i].mistakes;
              tr.append(td);
              break;
            case 6:
              td.innerText = storageObject1[i].percent;
              tr.append(td);
              break;
            default:
          }
        }
      }
    };

    renderTable();
    renderTableBod();

    const renderUp = function UprenderTableBody() {
      tBody.innerHTML = '';
      renderTableBod();
      fullTable.append(tBody);
    };

    const sordWord = function sortByWord(e, key) {
      if (e.target.classList.contains('sorted')) {
        storageObject1.sort((rowA, rowB) => (rowA[`${key}`] > rowB[`${key}`] ? 1 : -1));
        localStorage.setItem('statistic', JSON.stringify(storageObject1));
        e.target.classList.remove('sorted');
        renderUp();
      } else {
        storageObject1.sort((rowA, rowB) => (rowB.word > rowA.word ? 1 : -1));
        localStorage.setItem('statistic', JSON.stringify(storageObject1));
        e.target.classList.add('sorted');
        renderUp();
      }
    };

    const sordByNumber = function sortByNumber(e, key) {
      if (e.target.classList.contains('sorted')) {
        storageObject1.sort((a, b) => a[`${key}`] - b[`${key}`]);
        localStorage.setItem('statistic', JSON.stringify(storageObject1));
        renderUp();
        e.target.classList.remove('sorted');
      } else {
        storageObject1.sort((a, b) => b[`${key}`] - a[`${key}`]);
        localStorage.setItem('statistic', JSON.stringify(storageObject1));
        e.target.classList.add('sorted');
        renderUp();
      }
    };

    const sordTable = function sortTable(e) {
      switch (e.target.innerText) {
        case 'Word':
          sordWord(e, 'word');
          break;
        case 'Translation':
          sordWord(e, 'translation');
          break;
        case 'Train clicks':
          sordByNumber(e, 'clicks');
          break;
        case 'Num of guess':
          sordByNumber(e, 'guess');
          break;
        case 'Mistakes':
          sordByNumber(e, 'mistakes');
          break;
        case '% of mistakes':
          sordByNumber(e, 'percent');
          break;
        default:
      }
    };
    const resetStat = function resetStats() {
      storageObject1.forEach((el) => {
        const obj = el;
        obj.clicks = 0;
        obj.clicks = 0;
        obj.mistakes = 0;
        obj.guess = 0;
        obj.percent = 0;
        localStorage.setItem('statistic', JSON.stringify(storageObject1));
      });
      renderUp();
    };
    buttonResetTable.addEventListener('click', (e) => resetStat(e));
    tHead.addEventListener('click', (e) => sordTable(e));
  }
});
