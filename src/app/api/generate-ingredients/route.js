import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";

import { NextResponse } from "next/server";
import fs from "fs";

async function getFileAsBase64(filePath) {
  const fileData = await fs.readFile(filePath);
  return fileData.toString("base64");
}

async function deleteAllFiles(fileManager) {
  const listFilesResponse = await fileManager.listFiles();
  for (const file of listFilesResponse.files) {
    console.log(`name: ${file.name} | display name: ${file.displayName}`);
    await fileManager.deleteFile(file.name);
    console.log(`Deleted ${file.displayName}`);
  }
}

export async function POST(req, res) {
  try {
    const prompt =
      "From the provided video generate a list of all ingredients. Separate the output using commas. Dont add any additional information, ONLY the ingredient names.";

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);
    const video_url = "video.mp4";

    await deleteAllFiles(fileManager);


    const uploadResponse = await fileManager.uploadFile(video_url, {
      mimeType: "video/mp4",
      displayName: "Fridge",
    });

    console.log(
      `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
    );

    const name = uploadResponse.file.name;

    // Poll getFile() on a set interval (10 seconds here) to check file state.
    let file = await fileManager.getFile(name);
    while (file.state === FileState.PROCESSING) {
      process.stdout.write(".");
      // Sleep for 10 seconds
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      // Fetch the file from the API again
      file = await fileManager.getFile(name);
    }

    if (file.state === FileState.FAILED) {
      throw new Error("Video processing failed.");
    }

    // When file.state is ACTIVE, the file is ready to be used for inference.
    console.log(
      `File ${file.displayName} is ready for inference as ${file.uri}`
    );

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: prompt },
    ]);

    console.log(result.response.text());

    return NextResponse.json({ output: result.response.text() });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
