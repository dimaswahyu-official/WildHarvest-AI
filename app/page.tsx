"use client";

import { useState } from "react";

export default function WildHarvest() {
  const [foragedItems, setForagedItems] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!foragedItems) return;

    setLoading(true);
    setRecipe(""); 

    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foragedItems }),
      });

      const data = await response.json();

      if (response.ok) {
        setRecipe(data.recipe);
      } else {
        setRecipe("Oops, an error occurred: " + data.error);
      }
    } catch (error) {
      console.error(error);
      setRecipe("Failed to connect to the local server. Ensure Ollama is running in the background.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 border border-green-200">
        <h1 className="text-3xl font-bold text-green-900 mb-2">
          WildHarvest AI 🌲
        </h1>
        <p className="text-green-700 mb-6">
          Forage for ingredients on your trail, and let AI craft your campfire dinner menu. (Runs 100% Offline)
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="foragedItems" 
              className="block text-sm font-medium text-green-900 mb-1"
            >
              What did you find in the wild today?
            </label>
            <input
              id="foragedItems"
              type="text"
              value={foragedItems}
              onChange={(e) => setForagedItems(e.target.value)}
              placeholder="e.g., Meaty wild mushrooms, fern shoots, and pine needles"
              className="w-full px-4 py-2 text-green-900 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors
              ${loading 
                ? "bg-green-400 cursor-not-allowed" 
                : "bg-green-700 hover:bg-green-800"
              }`}
          >
            {loading ? "Foraging for recipe inspiration... 🏕️" : "Cook Now"}
          </button>
        </form>

        {recipe && (
          <div className="mt-8 p-6 bg-stone-50 rounded-xl border border-stone-200">
            <h2 className="text-xl font-semibold text-green-900 mb-4">
              Your Campfire Menu Options:
            </h2>
            <div className="text-stone-800 whitespace-pre-wrap leading-relaxed">
              {recipe}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}