// Google Sheets Integration Utilities
// This module provides functions to interact with Google Sheets via Next.js API routes

interface RegistrationData {
  employeeId: string;
  name: string;
  email: string;
  department: string;
  phone?: string;
  timestamp: string;
}

interface GameScoreData {
  employeeId: string;
  name: string;
  game: string;
  score: number;
  entries: number;
  timestamp: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  department: string;
  score: number;
  entries: number;
  timestamp?: string;
}

// Configuration - Replace with your Google Sheet ID and Web App URL
const GOOGLE_SHEET_CONFIG = {
  // Your Google Sheet Web App URL (from Google Apps Script deployment)
  webAppUrl: "", // Will be configured when user provides the URL
  
  // Sheet names
  sheets: {
    registrations: "Registrations",
    scores: "Scores",
    leaderboard: "Leaderboard",
  },
};

// Submit registration to Google Sheets via API route
export const submitRegistration = async (data: RegistrationData): Promise<boolean> => {
  try {
    const response = await fetch("/api/register-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error("Failed to submit registration");
    }
    
    return true;
  } catch (error) {
    console.error("Error submitting registration:", error);
    // Fallback to localStorage
    const existing = JSON.parse(localStorage.getItem("jtl_registrations") || "[]");
    existing.push(data);
    localStorage.setItem("jtl_registrations", JSON.stringify(existing));
    return true;
  }
};

// Submit game score to Google Sheets
export const submitGameScore = async (data: GameScoreData): Promise<boolean> => {
  if (!GOOGLE_SHEET_CONFIG.webAppUrl) {
    // Fallback to localStorage if Google Sheets not configured
    const existing = JSON.parse(localStorage.getItem("jtl_game_scores") || "[]");
    existing.push(data);
    localStorage.setItem("jtl_game_scores", JSON.stringify(existing));
    console.log("Game score saved to localStorage:", data);
    return true;
  }

  try {
    const response = await fetch(GOOGLE_SHEET_CONFIG.webAppUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "score",
        ...data,
      }),
    });
    return true;
  } catch (error) {
    console.error("Error submitting game score:", error);
    // Fallback to localStorage
    const existing = JSON.parse(localStorage.getItem("jtl_game_scores") || "[]");
    existing.push(data);
    localStorage.setItem("jtl_game_scores", JSON.stringify(existing));
    return true;
  }
};

// Fetch leaderboard from Google Sheets
export const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  if (!GOOGLE_SHEET_CONFIG.webAppUrl) {
    // Return mock data if Google Sheets not configured
    return getMockLeaderboard();
  }

  try {
    const response = await fetch(
      `${GOOGLE_SHEET_CONFIG.webAppUrl}?action=leaderboard`
    );
    const data = await response.json();
    return data.leaderboard || getMockLeaderboard();
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return getMockLeaderboard();
  }
};

// Mock leaderboard data
const getMockLeaderboard = (): LeaderboardEntry[] => [
  { rank: 1, name: "Ahmed Al-Rashid", department: "Sales", score: 2450, entries: 48 },
  { rank: 2, name: "Sara Mohammed", department: "Marketing", score: 2320, entries: 45 },
  { rank: 3, name: "Khalid Hassan", department: "IT", score: 2180, entries: 42 },
  { rank: 4, name: "Fatima Ali", department: "HR", score: 2050, entries: 38 },
  { rank: 5, name: "Omar Nasser", department: "Operations", score: 1920, entries: 35 },
];

// Get all local registrations (for admin view)
export const getLocalRegistrations = (): RegistrationData[] => {
  return JSON.parse(localStorage.getItem("jtl_registrations") || "[]");
};

// Get all local game scores (for admin view)
export const getLocalGameScores = (): GameScoreData[] => {
  return JSON.parse(localStorage.getItem("jtl_game_scores") || "[]");
};

// Configure Google Sheets integration
export const configureGoogleSheets = (webAppUrl: string) => {
  GOOGLE_SHEET_CONFIG.webAppUrl = webAppUrl;
  localStorage.setItem("jtl_sheets_url", webAppUrl);
};

// Load configuration from localStorage
export const loadGoogleSheetsConfig = () => {
  const savedUrl = localStorage.getItem("jtl_sheets_url");
  if (savedUrl) {
    GOOGLE_SHEET_CONFIG.webAppUrl = savedUrl;
  }
};

// Initialize on load
if (typeof window !== 'undefined') {
  loadGoogleSheetsConfig();
}
