import fs from 'fs/promises'; // Import the 'fs/promises' module for file operations
import { NextResponse } from 'next/server'; // Import 'NextResponse' for handling server responses

// Function to convert a ReadableStream to an MP4 Blob
async function convertStreamToMP4(stream) {
  const reader = stream.getReader(); // Get a reader from the stream
  let chunks = []; // Array to store the chunks of data
  let done = false;

  // Read the stream until it is done
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    if (value) chunks.push(value); // Push each chunk to the array
    done = doneReading; // Update the done status
  }

  // Create a Blob from the chunks with the MIME type 'video/mp4'
  const blob = new Blob(chunks, { type: 'video/mp4' });
  return blob; // Return the Blob
}

// POST request handler for processing the uploaded video
export async function POST(req, res) {
  try {
    const blob = await convertStreamToMP4(req.body); // Convert the stream to a Blob

    const arrayBuffer = await blob.arrayBuffer(); // Convert the Blob to an ArrayBuffer
    const buffer = Buffer.from(arrayBuffer); // Create a Buffer from the ArrayBuffer

    await fs.writeFile('video.mp4', buffer); // Write the Buffer to a file

    return NextResponse.json({ success: true }); // Respond with success
  } catch (error) {
    console.error('Error saving video:', error); // Log any errors
    return NextResponse.json({ error: 'Failed to save video' }, { status: 500 }); // Respond with an error
  }
}
