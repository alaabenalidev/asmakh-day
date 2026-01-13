import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const date = req.nextUrl.searchParams.get("date");
    if (!date) {
        return new Response("Missing date", { status: 400 });
    }

    const title = `Asmakh Day ${date}`;
    const start = `${date.replace(/-/g, "")}T120000`;
    const end = `${date.replace(/-/g, "")}T140000`;

    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Al Asmakh//Event//EN
BEGIN:VEVENT
UID:${Date.now()}@alasmakh.com
DTSTAMP:${start}
DTSTART:${start}
DTEND:${end}
SUMMARY:${title}
LOCATION:Al Asmakh Real Estate HQ
END:VEVENT
END:VCALENDAR`;

    return new Response(ics, {
        headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            "Content-Disposition": "inline",
        },
    });
}
