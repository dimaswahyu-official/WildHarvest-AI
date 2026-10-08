"use client";

import { useState } from "react";

export default function PuddingCrafter() {
  const [flavor, setFlavor] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flavor) return;

    setLoading(true);
    setRecipe(""); // Clear previous recipe while loading a new one

    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flavorProfile: flavor }),
      });

      const data = await response.json();

      if (response.ok) {
        setRecipe(data.recipe);
      } else {
        setRecipe("Oops, an error occurred: " + data.error);
      }
    } catch (error) {
      console.error(error);
      setRecipe("Failed to connect to the server. Ensure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
        <h1 className="text-3xl font-bold text-amber-900 mb-2">
          PuddingCrafter AI 🍮
        </h1>
        <p className="text-amber-700 mb-6">
          Craft innovative caramel sauces for your steamed egg pudding.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="flavor" 
              className="block text-sm font-medium text-amber-900 mb-1"
            >
              Desired Sauce Flavor Profile
            </label>
            <input
              id="flavor"
              type="text"
              value={flavor}
              onChange={(e) => setFlavor(e.target.value)}
              placeholder="e.g.: Bitter-sweet Arabica coffee with a hint of cranberry"
              className="w-full px-4 py-2 border text-amber-900 border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors
              ${loading 
                ? "bg-amber-300 cursor-not-allowed" 
                : "bg-amber-600 hover:bg-amber-700"
              }`}
          >
            {loading ? "Chef AI is crafting... 👨‍🍳" : "Generate Sauce Recipe"}
          </button>
        </form>

        {/* Area to display the recipe from AI */}
        {recipe && (
          <div className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-200">
            <h2 className="text-xl font-semibold text-amber-900 mb-4">
              Your Special Recipe:
            </h2>
            <div className="text-amber-900 whitespace-pre-wrap leading-relaxed">
              {recipe}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}