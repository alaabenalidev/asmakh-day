"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Crown, Star, TrendingUp } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  department: string;
  score: number;
  entries: number;
  employeeId: string;
}

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
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });

  const gameNameMap: Record<string, string> = {
    spin: "Spin to Win",
    memory: "Memory Match",
    quiz: "Quick Quiz",
    sudoku: "Sudoku",
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        let url = "/api/leaderboard/overall";
        if (activeTab !== "overall") {
          url = `/api/leaderboard/game?game=${encodeURIComponent(gameNameMap[activeTab])}`;
        }

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setLeaderboardData(data);
        } else {
          console.error("Failed to fetch leaderboard");
          setLeaderboardData([]);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setLeaderboardData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [activeTab]);

  return (
    <section id="leaderboard" className="py-20 md:py-32 bg-muted/30">
      <div className=" mx-auto px-4">
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

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading leaderboard...</p>
          </div>
        ) : (
          <>
            {/* Overall Leaderboard */}
            {activeTab === "overall" && leaderboardData.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-3xl mx-auto"
              >
                {/* Top 3 Podium */}
                <div className="grid grid-cols-3 gap-4 mb-8 items-end">
                  {/* 2nd Place */}
                  {leaderboardData.length > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 flex items-center justify-center mb-2 ring-4 ring-primary/30">
                        <span className="text-xl md:text-2xl font-bold text-primary">
                          {leaderboardData[1].name.charAt(0)}
                        </span>
                      </div>
                      <p className="font-semibold text-foreground text-sm md:text-base text-center truncate w-full">
                        {leaderboardData[1].name.split(" ")[0]}
                      </p>
                      <p className="text-xs text-muted-foreground">{leaderboardData[1].score} pts</p>
                      <div className="w-full h-24 mt-2 rounded-t-xl flex items-center justify-center bg-gray-400">
                        <span className="text-white font-bold text-2xl">2</span>
                      </div>
                    </motion.div>
                  )}

                  {/* 1st Place */}
                  {leaderboardData.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 flex items-center justify-center mb-2 ring-4 ring-primary/30">
                        <span className="text-xl md:text-2xl font-bold text-primary">
                          {leaderboardData[0].name.charAt(0)}
                        </span>
                      </div>
                      <p className="font-semibold text-foreground text-sm md:text-base text-center truncate w-full">
                        {leaderboardData[0].name.split(" ")[0]}
                      </p>
                      <p className="text-xs text-muted-foreground">{leaderboardData[0].score} pts</p>
                      <div className="w-full h-32 mt-2 rounded-t-xl flex items-center justify-center bg-yellow-500">
                        <span className="text-white font-bold text-2xl">1</span>
                      </div>
                    </motion.div>
                  )}

                  {/* 3rd Place */}
                  {leaderboardData.length > 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 flex items-center justify-center mb-2 ring-4 ring-primary/30">
                        <span className="text-xl md:text-2xl font-bold text-primary">
                          {leaderboardData[2].name.charAt(0)}
                        </span>
                      </div>
                      <p className="font-semibold text-foreground text-sm md:text-base text-center truncate w-full">
                        {leaderboardData[2].name.split(" ")[0]}
                      </p>
                      <p className="text-xs text-muted-foreground">{leaderboardData[2].score} pts</p>
                      <div className="w-full h-20 mt-2 rounded-t-xl flex items-center justify-center bg-amber-600">
                        <span className="text-white font-bold text-2xl">3</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Rest of Leaderboard */}
                <div className="space-y-3">
                  {leaderboardData.slice(3).map((player, index) => (
                    <motion.div
                      key={player.employeeId}
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
            {activeTab !== "overall" && leaderboardData.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-md mx-auto"
              >
                <div className="space-y-4">
                  {leaderboardData.map((player, index) => (
                    <motion.div
                      key={player.employeeId}
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
                          {player.score} pts
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {leaderboardData.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No scores available yet. Be the first to play!
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default LeaderboardSection;
