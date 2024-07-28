"use client";

import React from "react";
// import { Input } from "@/components/ui/input"
import { PiCamera } from "react-icons/pi";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useState } from "react";

const Footer = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [output, setOutput] = useState("");
  const [recipes, setRecipes] = useState([]);

  const generateIngredients = async () => {
    setOutput("Generating Ingredients...");
    try {
      const response = await fetch("/api/generate-ingredients", {
        method: "POST",
        body: JSON.stringify({ body: prompt }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.output);
        generateRecipes();
      } else {
        setOutput("Error: " + data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateRecipes = async () => {
    setOutput("Generating Recipes...");
    try {
      const response = await fetch("/api/generate-recipes", {
        method: "POST",
        body: JSON.stringify({
          ingredients: output,
          prompt:
            "Provide 4 common recipes in the given format for only using the given ingredients (you don't have to use everything, and assume they have common seasoning and oil). Make it detailed and only provide the recipes, NOTHING else. Output format:`{name:'', ingredients:[''],instructions:[''] }`",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json().then((data) => {
        console.log("Data:", data, typeof data);
        return data;
      });

      const obj = JSON.parse(data.output);
      console.log("Object:", obj);
      if (response.ok) {
        setRecipes(obj);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVideoChange = async (event) => {
    const video = event.target.files[0];
    const res = await fetch("/api", {
      method: "POST",
      body: video,
    });

    const data = await res.json();

    //return NextResponse.json({ success: true });
    // if success,
    if (data.success) {
        console.log("Success");
        await generateIngredients();
    }
  };

  return (
    <div className=" w-full h-16 bg-white flex flex-col justify-center align-middle items-center my-2 fixed bottom-0 left-0">
      {/* <Input className=" bg-goofygreen px-0 max-w-16 max-h-16 rounded-full"/> */}

      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<PiCamera size={40} color="black" />}
      >
        <VisuallyHiddenInput
          type="file"
          accept="video/*"
          capture="environment"
          onChange={handleVideoChange}
        />
      </Button>
    </div>
  );
};

export default Footer;
