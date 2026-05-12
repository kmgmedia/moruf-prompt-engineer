import { VercelRequest, VercelResponse } from "@vercel/node";
import {
  getAvailability,
  isGoogleCalendarConfigured,
} from "../src/lib/googleCalendar.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { date, timezone } = req.query;

  if (!date || typeof date !== "string") {
    return res.status(400).json({ error: "Missing date parameter" });
  }

  const tz = typeof timezone === "string" ? timezone : "Africa/Lagos";

  if (!isGoogleCalendarConfigured()) {
    return res.status(200).json({ bookedSlots: [] });
  }

  try {
    const bookedSlots = await getAvailability(date, tz);
    return res.status(200).json({ bookedSlots });
  } catch (error) {
    console.error("Availability check error:", error);
    return res.status(200).json({ bookedSlots: [] });
  }
}
