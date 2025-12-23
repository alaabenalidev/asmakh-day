import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const useSubmitScore = () => {
  const { user, addGameScore } = useAuth();
  const { toast } = useToast();

  const submitScore = async (game: string, score: number, entries: number) => {
    if (!user) {
      toast({
        title: "Not Logged In",
        description: "Please login to save your score.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/submit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: user.employeeId,
          name: user.name,
          game,
          score,
          entries,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        addGameScore(game, score, entries);
        toast({
          title: "Score Submitted!",
          description: `You earned ${score} points and ${entries} entries!`,
        });
      } else {
        toast({
          title: "Submission Failed",
          description: "Could not save your score to the leaderboard.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting score:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return { submitScore };
};
