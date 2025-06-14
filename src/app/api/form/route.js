import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const apiUrl = "https://node-task-form.vercel.app/api";
    const externalApiUrl = `${apiUrl}/users`;

    const externalResponse = await fetch(externalApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await externalResponse.json();

    if (result.error) {
      return NextResponse.json(
        { message: result.error || "External API error" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { message: "Data forwarded successfully!", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
