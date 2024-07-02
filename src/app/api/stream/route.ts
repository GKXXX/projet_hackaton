import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const GET = async (request: NextRequest) => {
  const filePath = path.join(process.cwd(), "public/music", "music1.mp3");

  console.log(filePath);

  try {
    const stats = await fs.promises.stat(filePath);
    const range = request.headers.get("range");

    if (!range) {
      return new NextResponse("Requires Range header", {
        status: 400,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    const positions = range.replace(/bytes=/, "").split("-");
    const start = parseInt(positions[0], 10);
    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    const chunksize = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${total}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize.toString(),
      "Content-Type": "audio/mpeg",
    };

    const readableStream = new ReadableStream({
      async start(controller) {
        const stream = fs.createReadStream(filePath, { start, end });
        stream.on("data", (chunk) => controller.enqueue(chunk));
        stream.on("end", () => controller.close());
        stream.on("error", (err) => controller.error(err));
      },
    });

    return new NextResponse(readableStream, { headers, status: 206 });
  } catch (err) {
    console.error("File not found:", err);
    return new NextResponse(JSON.stringify({ error: "File not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
