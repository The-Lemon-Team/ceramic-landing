export interface TelegramPost {
  id: string;
  category: "Update" | "Workshop" | "Process" | "Announcement";
  image?: string;
  text: string;
  timestamp: string;
  telegramUrl?: string;
}
