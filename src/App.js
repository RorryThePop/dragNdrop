import './App.css';
import React, { useState } from 'react';

function App() {
  const [cardList, setCardList] = useState([
    { id: 1, order: 1, name: 'ACE' },
    { id: 2, order: 2, name: 'VALET' },
    { id: 3, order: 3, name: 'QUEEN' },
    { id: 4, order: 4, name: 'KING' },
  ]);
  const [currentCard, setCurrentCard] = useState(null);

  function dragStartHandle(e, item) {
    setCurrentCard(item);
    console.log('drag', item);
  }
  function dragEndHandle(e) {
    e.target.style.backgroundColor = 'white';
  }
  function dragOverHandle(e, item) {
    e.preventDefault();
    e.target.style.backgroundColor = 'lightgray';
  }
  function dropHandle(e, item) {
    e.preventDefault();
    setCardList(
      cardList.map((c) => {
        if (c.id === item.id) {
          return { ...c, order: currentCard.order };
        }
        if (c.id === currentCard.id) {
          return { ...c, order: item.order };
        }
        return c;
      }),
    );
  }
  const counter = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };
  return (
    <div className="app">
      {cardList.sort(counter).map((item) => (
        <div
          onDragStart={(e) => dragStartHandle(e, item)}
          onDragEnd={(e) => dragEndHandle(e)}
          onDragOver={(e) => dragOverHandle(e)}
          onDrop={(e) => dropHandle(e, item)}
          draggable={true}
          className={'card'}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default App;
