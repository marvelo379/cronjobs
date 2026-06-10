import React, { useState } from 'react';
import './App.css'; // This imports our beautiful styles!

export default function App() {
  const [gameState, setGameState] = useState('welcome');
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Card One",
      question: "Which science are you obsessed with?",
      options: ["Material", "Quantum"],
      completed: false
    },
    {
      id: 2,
      title: "Card Two",
      question: "Which is easier to compromise?",
      options: ["Family", "Friends", "Work"],
      completed: false
    },
    {
      id: 3,
      title: "Card Three",
      question: "What are you obsessed with?",
      options: ["Your ideology", "Others ideology", "Books"],
      completed: false
    }
  ]);

  const startGame = () => {
    setGameState('playing');
    setActiveCardIndex(null);
  };

  const selectCard = (index) => {
    setActiveCardIndex(index);
  };

  const handleAnswer = () => {
    const updatedCards = [...cards];
    updatedCards[activeCardIndex].completed = true;
    setCards(updatedCards);
    setActiveCardIndex(null);

    const allDone = updatedCards.every(card => card.completed);
    if (allDone) {
      setGameState('finished');
    }
  };

  const resetGame = () => {
    const resetCards = cards.map(card => ({ ...card, completed: false }));
    setCards(resetCards);
    setGameState('welcome');
    setActiveCardIndex(null);
  };

  return (
    <div className="app-container">
      
      {/* SCREEN 1: WELCOME */}
      {gameState === 'welcome' && (
        <div className="card-box">
          <h1 className="title">Wisher App 🌟</h1>
          <p className="subtitle">Touch the choices to unlock your birthday note.</p>
          <button className="primary-btn" onClick={startGame}>Let's Play</button>
        </div>
      )}

      {/* SCREEN 2: PLAYING */}
      {gameState === 'playing' && (
        <div style={{ width: '100%' }}>
          {activeCardIndex === null ? (
            <div>
              <h2 className="heading">Pick a card out of the remaining choices:</h2>
              <div className="card-grid">
                {cards.map((card, index) => {
                  if (card.completed) return null;
                  return (
                    <div 
                      key={card.id} 
                      className="game-card" 
                      onClick={() => selectCard(index)}
                    >
                      <h3>🎁</h3>
                      <p>Card {index + 1}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="card-box">
              <h3 className="question-title">Question {activeCardIndex + 1}</h3>
              <p className="question-text">{cards[activeCardIndex].question}</p>
              
              <div className="options-container">
                {cards[activeCardIndex].options.map((option, idx) => (
                  <button 
                    key={idx} 
                    className="option-btn"
                    onClick={handleAnswer}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SCREEN 3: FINISHED POPUP */}
      {gameState === 'finished' && (
        <div className="overlay">
          <div className="popup">
            <h2 className="popup-emoji">🫠🎉🫠</h2>
            <h1 className="popup-text">Enjoy ur special day, live it  :)</h1>
            <p className="popup-subtext">you r osum</p>
            <button className="primary-btn" onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}

    </div>
  );
}