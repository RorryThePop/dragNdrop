import './App.css';
import React, { useState } from 'react';
function App() {
  const [cardList, setcardList] = useState([
    { id: 1, order: 1, text: 'card 1' },
    { id: 2, order: 2, text: 'card 2' },
    { id: 3, order: 3, text: 'card 3' },
    { id: 4, order: 4, text: 'card 4' },
  ]);
  const [currentCard, setCurrentCard] = useState(null);
  function dragStartHandler(e, card) {
    console.log('drop', card);
    setCurrentCard(card);
  }
  function dragEndHandler(e) {
    e.target.style.background = 'white';
  }
  function dragOverHandler(e, card) {
    e.preventDefault();
    e.target.style.background = 'lightgray';
  }
  function dropHandler(e, card) {
    e.preventDefault();
    setcardList(
      cardList.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard.order };
        }
        if (c.id === currentCard.id) {
          return { ...c, order: card.order };
        }
        return c;
      }),
    );
    e.target.style.background = 'white';
  }
  const nullCard = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };
  return (
    <div className="app">
      {cardList.sort(nullCard).map((card) => (
        //свойство draggable позволяет перетаскивать объекты
        <div
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, card)}
          draggable={true}
          className={'card'}>
          {card.text}
        </div>
      ))}
    </div>
  );
}

export default App;
