import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, Check, X, Clock, HelpCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useSubmitScore } from "@/hooks/useSubmitScore";

// Generate a simple 4x4 Sudoku puzzle for quick gameplay
const generatePuzzle = () => {
  // Valid 4x4 Sudoku solution
  const solutions = [
    [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 1, 4, 3],
      [4, 3, 2, 1],
    ],
    [
      [2, 1, 4, 3],
      [4, 3, 2, 1],
      [1, 2, 3, 4],
      [3, 4, 1, 2],
    ],
    [
      [4, 3, 2, 1],
      [2, 1, 4, 3],
      [3, 4, 1, 2],
      [1, 2, 3, 4],
    ],
  ];

  const solution = solutions[Math.floor(Math.random() * solutions.length)];
  const puzzle = solution.map((row) => [...row]);

  // Remove some numbers to create the puzzle (keep 6-8 numbers visible)
  const cellsToRemove = 8 + Math.floor(Math.random() * 3);
  const removed: Set<string> = new Set();

  while (removed.size < cellsToRemove) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    const key = `${row}-${col}`;
    if (!removed.has(key)) {
      removed.add(key);
      puzzle[row][col] = 0;
    }
  }

  return { puzzle, solution, removed };
};

interface SudokuGameProps {
  onComplete?: (score: number, entries: number) => void;
}

const SudokuGame = ({ onComplete }: SudokuGameProps) => {
  const [gameData, setGameData] = useState(() => generatePuzzle());
  const [board, setBoard] = useState(gameData.puzzle.map((row) => [...row]));
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [hintsUsed, setHintsUsed] = useState(0);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { submitScore } = useSubmitScore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isComplete) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameData.removed.has(`${row}-${col}`)) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = useCallback(
    (num: number) => {
      if (!selectedCell || isComplete) return;

      const newBoard = board.map((row) => [...row]);
      newBoard[selectedCell.row][selectedCell.col] = num;
      setBoard(newBoard);

      // Check if correct
      const newErrors = new Set(errors);
      const key = `${selectedCell.row}-${selectedCell.col}`;
      
      if (num !== gameData.solution[selectedCell.row][selectedCell.col]) {
        newErrors.add(key);
      } else {
        newErrors.delete(key);
      }
      setErrors(newErrors);

      // Check if puzzle is complete
      const allFilled = newBoard.every((row) => row.every((cell) => cell !== 0));
      const allCorrect = newErrors.size === 0;

      if (allFilled && allCorrect) {
        setIsComplete(true);
        setIsRunning(false);
        
        // Calculate score and entries
        const baseScore = 100;
        const timeBonus = Math.max(0, 60 - timer) * 2;
        const hintPenalty = hintsUsed * 10;
        const finalScore = Math.max(0, baseScore + timeBonus - hintPenalty);
        const entries = Math.ceil(finalScore / 25);

        if (isAuthenticated) {
          submitScore("Sudoku", finalScore, entries);
        } else {
             toast({
                title: "Puzzle Complete!",
                description: `You earned ${entries} prize entries! Login to save your score.`,
              });
        }

        onComplete?.(finalScore, entries);
      }
    },
    [selectedCell, board, errors, gameData.solution, isComplete, timer, hintsUsed, isAuthenticated, submitScore, toast, onComplete]
  );

  const useHint = () => {
    if (!selectedCell || hintsUsed >= 3) return;
    
    const correctValue = gameData.solution[selectedCell.row][selectedCell.col];
    handleNumberInput(correctValue);
    setHintsUsed((prev) => prev + 1);
  };

  const resetGame = () => {
    const newGame = generatePuzzle();
    setGameData(newGame);
    setBoard(newGame.puzzle.map((row) => [...row]));
    setSelectedCell(null);
    setErrors(new Set());
    setIsComplete(false);
    setTimer(0);
    setIsRunning(true);
    setHintsUsed(0);
  };

  const getCellStyle = (row: number, col: number) => {
    const key = `${row}-${col}`;
    const isEditable = gameData.removed.has(key);
    const isSelected = selectedCell?.row === row && selectedCell?.col === col;
    const hasError = errors.has(key);
    const isInSameBlock = 
      selectedCell && 
      Math.floor(selectedCell.row / 2) === Math.floor(row / 2) && 
      Math.floor(selectedCell.col / 2) === Math.floor(col / 2);
    const isInSameRowOrCol = 
      selectedCell && 
      (selectedCell.row === row || selectedCell.col === col);

    let classes = "w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-2xl font-bold transition-all ";

    if (isSelected) {
      classes += "bg-primary/30 ring-2 ring-primary ";
    } else if (hasError) {
      classes += "bg-destructive/20 text-destructive ";
    } else if (isInSameBlock || isInSameRowOrCol) {
      classes += "bg-primary/10 ";
    } else {
      classes += "bg-card ";
    }

    if (!isEditable) {
      classes += "text-foreground ";
    } else {
      classes += "text-primary cursor-pointer hover:bg-primary/20 ";
    }

    // Add border styles for 2x2 blocks
    if (col === 1) classes += "border-r-2 border-r-foreground/30 ";
    if (row === 1) classes += "border-b-2 border-b-foreground/30 ";

    return classes;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Timer and Controls */}
      <div className="flex items-center justify-between w-full max-w-xs mb-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="font-mono">{formatTime(timer)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={useHint}
            disabled={hintsUsed >= 3 || !selectedCell || isComplete}
          >
            <HelpCircle className="w-4 h-4 mr-1" />
            Hint ({3 - hintsUsed})
          </Button>
          <Button variant="outline" size="sm" onClick={resetGame}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Sudoku Board */}
      <div className="bg-muted/50 p-2 rounded-xl shadow-lg">
        <div className="grid grid-cols-4 gap-1">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className={getCellStyle(rowIndex, colIndex)}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                whileHover={{ scale: gameData.removed.has(`${rowIndex}-${colIndex}`) ? 1.05 : 1 }}
                whileTap={{ scale: gameData.removed.has(`${rowIndex}-${colIndex}`) ? 0.95 : 1 }}
              >
                {cell !== 0 ? cell : ""}
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Number Input */}
      {!isComplete && (
        <div className="flex gap-2 mt-6">
          {[1, 2, 3, 4].map((num) => (
            <motion.button
              key={num}
              className="w-12 h-12 rounded-xl bg-secondary text-secondary-foreground font-bold text-xl shadow-md hover:bg-secondary/80 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleNumberInput(num)}
              disabled={!selectedCell}
            >
              {num}
            </motion.button>
          ))}
          <motion.button
            className="w-12 h-12 rounded-xl bg-muted text-muted-foreground font-bold text-xl shadow-md hover:bg-muted/80 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => selectedCell && handleNumberInput(0)}
            disabled={!selectedCell}
          >
            <X className="w-5 h-5 mx-auto" />
          </motion.button>
        </div>
      )}

      {/* Completion Message */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">
            🎊 Puzzle Solved! 🎊
          </h3>
          <p className="text-muted-foreground mb-4">
            Completed in {formatTime(timer)} with {hintsUsed} hints used
          </p>
          <Button variant="game" onClick={resetGame}>
            Play Again
          </Button>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="mt-6 text-center text-sm text-muted-foreground max-w-xs">
        <p>Fill in the grid so each row, column, and 2×2 box contains numbers 1-4</p>
      </div>
    </div>
  );
};

export default SudokuGame;
