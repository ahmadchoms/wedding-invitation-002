import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // ── Validation ──────────────────────────────
    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Nama harus diisi." },
        { status: 400 },
      );
    }

    if (!["hadir", "tidak_hadir"].includes(body.attendance)) {
      return NextResponse.json(
        { success: false, error: "Konfirmasi kehadiran harus dipilih." },
        { status: 400 },
      );
    }

    if (
      body.attendance === "hadir" &&
      (!body.guestCount || body.guestCount < 1)
    ) {
      return NextResponse.json(
        { success: false, error: "Jumlah tamu harus diisi." },
        { status: 400 },
      );
    }

    // ── Simulate async DB write ──────────────────
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Log to console (replace with actual persistence)
    console.log("[RSVP Submission]", {
      ...body,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: `Terima kasih, ${body.name}! Konfirmasi kehadiran Anda telah kami terima.`,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan. Silakan coba lagi." },
      { status: 500 },
    );
  }
}
