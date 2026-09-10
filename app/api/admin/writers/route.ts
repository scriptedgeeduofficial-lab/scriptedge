import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";

function generateWriterCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let randomPart = "";

  for (let i = 0; i < 4; i++) {
    randomPart += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }

  return `WSE${randomPart}`;
}

async function generateUniqueWriterCode() {
  for (let attempt = 0; attempt < 10; attempt++) {
    const writerCode = generateWriterCode();

    const existingWriter = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.writerCode, writerCode))
      .limit(1);

    if (existingWriter.length === 0) {
      return writerCode;
    }
  }

  throw new Error("Unable to generate a unique writer code.");
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 403 },
      );
    }

    const writers = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        writerCode: user.writerCode,
        createdAt: user.createdAt,
      })
      .from(user)
      .where(eq(user.role, "WRITER"));

    return NextResponse.json({
      success: true,
      writers,
    });
  } catch (error) {
    console.error("Get writers error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load writers.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 403 },
      );
    }

    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and password are required.",
        },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters.",
        },
        { status: 400 },
      );
    }

    const writerCode = await generateUniqueWriterCode();

    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    if (!result?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create writer account.",
        },
        { status: 500 },
      );
    }

    await db
      .update(user)
      .set({
        role: "WRITER",
        writerCode,
      })
      .where(eq(user.id, result.user.id));

    return NextResponse.json({
      success: true,
      message: "Writer created successfully.",
      writer: {
        id: result.user.id,
        writerCode,
        name: result.user.name,
        email: result.user.email,
        role: "WRITER",
      },
    });
  } catch (error) {
    console.error("Create writer error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create writer account.",
      },
      { status: 500 },
    );
  }
}