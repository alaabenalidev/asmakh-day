import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Crown, Star, TrendingUp } from "lucide-react";

// Mock leaderboard data (in production, this would come from Google Sheets)
const mockLeaderboard = [
  { rank: 1, name: "Ahmed Al-Rashid", department: "Sales", score: 2450, entries: 48 },
  { rank: 2, name: "Sara Mohammed", department: "Marketing", score: 2320, entries: 45 },
  { rank: 3, name: "Khalid Hassan", department: "IT", score: 2180, entries: 42 },
  { rank: 4, name: "Fatima Ali", department: "HR", score: 2050, entries: 38 },
  { rank: 5, name: "Omar Nasser", department: "Operations", score: 1920, entries: 35 },
  { rank: 6, name: "Layla Ibrahim", department: "Finance", score: 1840, entries: 33 },
  { rank: 7, name: "Hassan Mahmoud", department: "Legal", score: 1750, entries: 30 },
  { rank: 8, name: "Nour Ahmed", department: "Property Management", score: 1680, entries: 28 },
  { rank: 9, name: "Youssef Karim", department: "Sales", score: 1590, entries: 26 },
  { rank: 10, name: "Maha Abdullah", department: "Marketing", score: 1500, entries: 24 },
];

const gameLeaderboards = {
  spin: [
    { rank: 1, name: "Ahmed Al-Rashid", wins: 12 },
    { rank: 2, name: "Omar Nasser", wins: 10 },
    { rank: 3, name: "Fatima Ali", wins: 8 },
  ],
  memory: [
    { rank: 1, name: "Sara Mohammed", bestMoves: 8 },
    { rank: 2, name: "Khalid Hassan", bestMoves: 10 },
    { rank: 3, name: "Layla Ibrahim", bestMoves: 11 },
  ],
  quiz: [
    { rank: 1, name: "Nour Ahmed", perfectScores: 5 },
    { rank: 2, name: "Hassan Mahmoud", perfectScores: 4 },
    { rank: 3, name: "Ahmed Al-Rashid", perfectScores: 3 },
  ],
  sudoku: [
    { rank: 1, name: "Khalid Hassan", completed: 8 },
    { rank: 2, name: "Sara Mohammed", completed: 6 },
    { rank: 3, name: "Youssef Karim", completed: 5 },
  ],
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-500" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Medal className="w-6 h-6 text-amber-600" />;
    default:
      return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">{rank}</span>;
  }
};

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border-yellow-500/30";
    case 2:
      return "bg-gradient-to-r from-gray-300/20 to-gray-400/10 border-gray-400/30";
    case 3:
      return "bg-gradient-to-r from-amber-500/20 to-amber-600/10 border-amber-500/30";
    default:
      return "bg-card border-border";
  }
};

const LeaderboardSection = () => {
  const [activeTab, setActiveTab] = useState<"overall" | "spin" | "memory" | "quiz" | "sudoku">("overall");

  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <section id="leaderboard" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Trophy className="w-4 h-4 inline mr-2" />
            Monthly Rankings
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Top <span className="text-accent">Players</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Compete with your colleagues and climb the leaderboard for {currentMonth}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: "overall", label: "Overall" },
            { id: "spin", label: "Spin Wheel" },
            { id: "memory", label: "Memory Match" },
            { id: "quiz", label: "Quick Quiz" },
            { id: "sudoku", label: "Sudoku" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overall Leaderboard */}
        {activeTab === "overall" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto"
          >
            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[mockLeaderboard[1], mockLeaderboard[0], mockLeaderboard[2]].map((player, index) => {
                const podiumOrder = [2, 1, 3];
                const heights = ["h-24", "h-32", "h-20"];
                return (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 flex items-center justify-center mb-2 ring-4 ring-primary/30">
                      <span className="text-xl md:text-2xl font-bold text-primary">
                        {player.name.charAt(0)}
                      </span>
                    </div>
                    <p className="font-semibold text-foreground text-sm md:text-base text-center">
                      {player.name.split(" ")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground">{player.score} pts</p>
                    <div
                      className={`w-full ${heights[index]} mt-2 rounded-t-xl flex items-center justify-center ${
                        podiumOrder[index] === 1
                          ? "bg-yellow-500"
                          : podiumOrder[index] === 2
                          ? "bg-gray-400"
                          : "bg-amber-600"
                      }`}
                    >
                      <span className="text-white font-bold text-2xl">{podiumOrder[index]}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Rest of Leaderboard */}
            <div className="space-y-3">
              {mockLeaderboard.slice(3).map((player, index) => (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${getRankStyle(player.rank)}`}
                >
                  {getRankIcon(player.rank)}
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{player.name}</p>
                    <p className="text-sm text-muted-foreground">{player.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{player.score}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3" />
                      {player.entries} entries
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Game-specific Leaderboards */}
        {activeTab !== "overall" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md mx-auto"
          >
            <div className="space-y-4">
              {gameLeaderboards[activeTab as keyof typeof gameLeaderboards].map((player, index) => (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-5 rounded-2xl border ${getRankStyle(player.rank)}`}
                >
                  {getRankIcon(player.rank)}
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{player.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span className="font-bold text-accent">
                      {activeTab === "spin" && `${(player as { wins: number }).wins} wins`}
                      {activeTab === "memory" && `${(player as { bestMoves: number }).bestMoves} moves`}
                      {activeTab === "quiz" && `${(player as { perfectScores: number }).perfectScores} perfect`}
                      {activeTab === "sudoku" && `${(player as { completed: number }).completed} solved`}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LeaderboardSection;
