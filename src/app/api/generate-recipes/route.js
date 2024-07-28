import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from "@google/generative-ai";
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";

import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const post_data = await req.json();
    const ingredients = post_data.ingredients;
    console.log("Recipies:");
    console.log(req);
    const prompt = post_data.prompt;
      // "Provide 4 common recipes in the given format for only using the given ingredients (you don't have to use everything, and assume they have common seasoning and oil). Make it detailed and only provide the recipes, NOTHING else. Output format:`{name:'', ingredients:[''],instructions:[''] }`";

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const result = await model.generateContent([
      {
        text: prompt,
      },
      { text: ingredients },
    ]);

    return NextResponse.json({ output: result.response.text() });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
