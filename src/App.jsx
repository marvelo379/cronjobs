import React, { useState } from 'react';

export default function App() {
  // Game states: 'welcome', 'playing', 'finished'
  const [gameState, setGameState] = useState('welcome');
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  // The 3 questions data
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

  // Start the game
  const startGame = () => {
    setGameState('playing');
    setActiveCardIndex(null);
  };

  // Select a card to answer its question
  const selectCard = (index) => {
    setActiveCardIndex(index);
  };

  // Handle answering a question
  const handleAnswer = (option) => {
    // 1. Mark the current card as completed
    const updatedCards = [...cards];
    updatedCards[activeCardIndex].completed = true;
    setCards(updatedCards);

    // 2. Clear the active card view
    setActiveCardIndex(null);

    // 3. Check if all cards are now completed
    const allDone = updatedCards.every(card => card.completed);
    if (allDone) {
      setGameState('finished');
    }
  };

  // Reset the game back to the start
  const resetGame = () => {
    const resetCards = cards.map(card => ({ ...card, completed: false }));
    setCards(resetCards);
    setGameState('welcome');
    setActiveCardIndex(null);
  };

  return (
    <div style={styles.container}>
      
      {/* SCREEN 1: WELCOME */}
      {gameState === 'welcome' && (
        <div style={styles.cardBox}>
          <h1 style={styles.title}>Welcome to the Wisher.com 🌟</h1>
          <p style={styles.subtitle}>Are you ready to reveal your destiny?</p>
          <button style={styles.primaryBtn} onClick={startGame}>Let's Play</button>
        </div>
      )}

      {/* SCREEN 2: PLAYING */}
      {gameState === 'playing' && (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
          
          {/* If NO card is selected, show remaining cards */}
          {activeCardIndex === null ? (
            <div>
              <h2 style={styles.heading}>Choose a card to reveal a question:</h2>
              <div style={styles.cardGrid}>
                {cards.map((card, index) => {
                  // If already answered, do not render it on the UI
                  if (card.completed) return null;

                  return (
                    <div 
                      key={card.id} 
                      style={styles.gameCard} 
                      onClick={() => selectCard(index)}
                    >
                      <h3>✨</h3>
                      <p>Card {index + 1}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* If a card IS selected, show its question */
            <div style={styles.cardBox}>
              <h3 style={styles.questionTitle}>Question for Card {activeCardIndex + 1}</h3>
              <p style={styles.questionText}>{cards[activeCardIndex].question}</p>
              
              <div style={styles.optionsContainer}>
                {cards[activeCardIndex].options.map((option, idx) => (
                  <button 
                    key={idx} 
                    style={styles.optionBtn}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SCREEN 3: FINISHED / POPUP */}
      {gameState === 'finished' && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h2 style={styles.popupEmoji}>🎉🫠👑</h2>
            <h1 style={styles.popupText}>Enjoy ur special day, live it :)</h1>
            <p style={styles.popupSubtext}>you r osum</p>
            <button style={styles.primaryBtn} onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}

    </div>
  );
}

// Inline Styles for simple and elegant look without external CSS files
const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  cardBox: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '450px',
    width: '100%',
  },
  title: {
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#666',
    marginBottom: '30px',
  },
  heading: {
    color: '#444',
    marginBottom: '24px',
  },
  primaryBtn: {
    backgroundColor: '#6c5ce7',
    color: '#fff',
    border: 'none',
    padding: '12px 30px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'transform 0.2s',
  },
  cardGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
  gameCard: {
    backgroundColor: '#6c5ce7',
    color: '#fff',
    width: '120px',
    height: '160px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 8px 15px rgba(108, 92, 231, 0.3)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  questionTitle: {
    color: '#6c5ce7',
    margin: '0 0 10px 0',
  },
  questionText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: '25px',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  optionBtn: {
    backgroundColor: '#f1f2f6',
    border: '2px solid #e4e7eb',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
    fontWeight: '500',
    color: '#2d3436',
    transition: 'background-color 0.2s',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    animation: 'scaleUp 0.3s ease-out',
    maxWidth: '400px',
    width: '90%',
  },
  popupEmoji: {
    fontSize: '40px',
    margin: '0 0 15px 0',
  },
  popupText: {
    fontSize: '24px',
    color: '#2d3436',
    margin: '0 0 10px 0',
  },
  popupSubtext: {
    fontSize: '18px',
    color: '#6c5ce7',
    fontWeight: 'bold',
    marginBottom: '30px',
  }
};