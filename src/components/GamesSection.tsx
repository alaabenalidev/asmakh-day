import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gamepad2, Trophy, Star, RefreshCw } from "lucide-react";

// Spin Wheel Game
const SpinWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const prizes = [
    "50 QAR Gift Card",
    "Free Lunch",
    "Extra Break",
    "Movie Ticket",
    "Coffee Voucher",
    "Desk Upgrade",
    "Parking Spot",
    "Try Again",
  ];

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    const spins = 5 + Math.random() * 3;
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = spins * 360 + extraDegrees;
    
    setRotation((prev) => prev + totalRotation);

    setTimeout(() => {
      const prizeIndex = Math.floor((360 - (extraDegrees % 360)) / (360 / prizes.length)) % prizes.length;
      setResult(prizes[prizeIndex]);
      setIsSpinning(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-foreground" />
        </div>
        
        {/* Wheel */}
        <motion.div
          className="w-full h-full rounded-full shadow-2xl"
          style={{
            background: `conic-gradient(
              hsl(15 85% 55%) 0deg 45deg,
              hsl(42 95% 55%) 45deg 90deg,
              hsl(175 60% 45%) 90deg 135deg,
              hsl(330 70% 55%) 135deg 180deg,
              hsl(260 60% 55%) 180deg 225deg,
              hsl(200 70% 50%) 225deg 270deg,
              hsl(120 50% 45%) 270deg 315deg,
              hsl(45 90% 50%) 315deg 360deg
            )`,
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
          }}
        >
          {prizes.map((prize, i) => (
            <div
              key={i}
              className="absolute w-full h-full flex items-center justify-center"
              style={{
                transform: `rotate(${i * 45 + 22.5}deg)`,
              }}
            >
              <span className="text-xs md:text-sm font-bold text-white absolute top-8 transform -rotate-90 whitespace-nowrap max-w-[80px] truncate">
                {prize}
              </span>
            </div>
          ))}
        </motion.div>
        
        {/* Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-card shadow-lg flex items-center justify-center">
          <Star className="w-8 h-8 text-accent" />
        </div>
      </div>

      <Button
        variant="game"
        size="xl"
        className="mt-8"
        onClick={spin}
        disabled={isSpinning}
      >
        {isSpinning ? "Spinning..." : "SPIN TO WIN!"}
      </Button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-6 text-center"
          >
            <p className="text-muted-foreground mb-2">You won:</p>
            <p className="font-display text-2xl font-bold text-primary animate-celebrate">
              🎉 {result} 🎉
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Memory Flip Cards Game
const FlipCards = () => {
  const emojis = ["🎉", "🎁", "🏆", "⭐", "🎮", "🎯"];
  const [cards, setCards] = useState(() => {
    const doubled = [...emojis, ...emojis];
    return doubled.sort(() => Math.random() - 0.5).map((emoji, i) => ({
      id: i,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
  });
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const flipCard = (id: number) => {
    if (selectedCards.length === 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);
    setSelectedCards([...selectedCards, id]);

    if (selectedCards.length === 1) {
      setMoves(moves + 1);
      const firstCard = cards[selectedCards[0]];
      const secondCard = newCards[id];

      if (firstCard.emoji === secondCard.emoji) {
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[selectedCards[0]].isMatched = true;
          matchedCards[id].isMatched = true;
          setCards(matchedCards);
          setSelectedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[selectedCards[0]].isFlipped = false;
          resetCards[id].isFlipped = false;
          setCards(resetCards);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    const doubled = [...emojis, ...emojis];
    setCards(
      doubled.sort(() => Math.random() - 0.5).map((emoji, i) => ({
        id: i,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
    );
    setSelectedCards([]);
    setMoves(0);
  };

  const isWon = cards.every((card) => card.isMatched);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-muted-foreground">Moves: {moves}</span>
        <Button variant="outline" size="sm" onClick={resetGame}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-xl cursor-pointer flex items-center justify-center text-2xl font-bold shadow-md ${
              card.isFlipped || card.isMatched
                ? "bg-accent"
                : "bg-secondary"
            } ${card.isMatched ? "opacity-60" : ""}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => flipCard(card.id)}
          >
            {card.isFlipped || card.isMatched ? card.emoji : "?"}
          </motion.div>
        ))}
      </div>

      {isWon && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <p className="font-display text-2xl font-bold text-primary">
            🎊 Congratulations! 🎊
          </p>
          <p className="text-muted-foreground mt-2">
            You won in {moves} moves!
          </p>
        </motion.div>
      )}
    </div>
  );
};

// Quick Quiz Game
const QuickQuiz = () => {
  const questions = [
    {
      question: "What year was Al Asmakh Real Estate founded?",
      options: ["1995", "2000", "2005", "2010"],
      correct: 1,
    },
    {
      question: "Which department hosts the most events?",
      options: ["HR", "Sales", "Marketing", "Operations"],
      correct: 0,
    },
    {
      question: "What's the company's main business focus?",
      options: ["Technology", "Real Estate", "Healthcare", "Finance"],
      correct: 1,
    },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    
    if (index === questions[currentQ].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="text-center">
        <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-12 h-12 text-accent" />
        </div>
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">
          Quiz Complete!
        </h3>
        <p className="text-lg text-muted-foreground mb-6">
          You scored {score} out of {questions.length}
        </p>
        <Button variant="game" onClick={resetQuiz}>
          Play Again
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground">
          Question {currentQ + 1}/{questions.length}
        </span>
        <span className="text-sm font-medium text-primary">Score: {score}</span>
      </div>

      <h3 className="font-display text-xl font-bold text-foreground mb-6">
        {questions[currentQ].question}
      </h3>

      <div className="space-y-3">
        {questions[currentQ].options.map((option, index) => (
          <motion.button
            key={index}
            className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
              selectedAnswer === null
                ? "bg-card border-2 border-border hover:border-primary"
                : selectedAnswer === index
                ? index === questions[currentQ].correct
                  ? "bg-green-100 border-2 border-green-500 text-green-700"
                  : "bg-red-100 border-2 border-red-500 text-red-700"
                : index === questions[currentQ].correct
                ? "bg-green-100 border-2 border-green-500 text-green-700"
                : "bg-card border-2 border-border opacity-50"
            }`}
            whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
            whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const games = [
  {
    id: "spin",
    name: "Spin to Win",
    description: "Spin the wheel for a chance to win amazing prizes!",
    icon: Star,
    component: SpinWheel,
  },
  {
    id: "flip",
    name: "Memory Match",
    description: "Test your memory by matching pairs of cards!",
    icon: Gamepad2,
    component: FlipCards,
  },
  {
    id: "quiz",
    name: "Quick Quiz",
    description: "Answer company trivia to earn bonus entries!",
    icon: Trophy,
    component: QuickQuiz,
  },
];

const GamesSection = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <section id="games" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            Mini Games
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Play & Win <span className="text-accent">Rewards</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Complete mini-games to earn entries into our monthly prize draw.
            The more you play, the more chances you have to win!
          </p>
        </motion.div>

        {/* Games Grid */}
        <AnimatePresence mode="wait">
          {!activeGame ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-game cursor-pointer group"
                  onClick={() => setActiveGame(game.id)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-secondary-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <game.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-2xl font-bold">
                      {game.name}
                    </h3>
                  </div>
                  <p className="text-secondary-foreground/80 mb-6">
                    {game.description}
                  </p>
                  <Button
                    variant="accent"
                    className="w-full group-hover:scale-105 transition-transform"
                  >
                    Play Now
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto"
            >
              <div className="card-festive">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {games.find((g) => g.id === activeGame)?.name}
                  </h3>
                  <Button variant="ghost" onClick={() => setActiveGame(null)}>
                    ← Back to Games
                  </Button>
                </div>

                {games.find((g) => g.id === activeGame)?.component &&
                  (() => {
                    const GameComponent = games.find(
                      (g) => g.id === activeGame
                    )!.component;
                    return <GameComponent />;
                  })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GamesSection;
