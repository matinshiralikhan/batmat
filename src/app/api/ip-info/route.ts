import { NextRequest, NextResponse } from "next/server";

const FIELDS = "status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,as,proxy,hosting,mobile,query";

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const clientIP = forwarded ? forwarded.split(",")[0].trim() : "";

  try {
    const target = clientIP ? `http://ip-api.com/json/${clientIP}` : "http://ip-api.com/json/";
    const res = await fetch(`${target}?fields=${FIELDS}`, { next: { revalidate: 0 } });
    if (!res.ok) {
      return NextResponse.json({ status: "fail", message: `upstream ${res.status}` }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ status: "fail", message: String(e) }, { status: 502 });
  }
}
