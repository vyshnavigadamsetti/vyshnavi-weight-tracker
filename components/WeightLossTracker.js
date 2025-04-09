import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";

const initialPlan = [
  {
    day: "Wednesday",
    date: "2025-04-09",
    breakfast: "Moong chilla + chutney",
    lunch: "Lunch at office",
    dinner: "Rasam + bhindi + 1 phulka",
    workoutPlan: [
      "🏋️‍♀️ Leg press – 2x12",
      "🏋️‍♀️ Chest press – 2x10",
      "🚶 Treadmill walk – 10 mins",
      "🤸‍♀️ Stretching – 5 mins"
    ]
  }
];

export default function WeightLossTracker() {
  const [tracker, setTracker] = useState(() => {
    if (typeof window !== "undefined") {
      // Check if localStorage is available
      const saved = localStorage.getItem("healthTracker");
      return saved ? JSON.parse(saved) : initialPlan.map((item) => ({
        ...item,
        breakfastDone: false,
        lunchDone: false,
        dinnerDone: false,
        workoutDone: false,
        water: "",
        sleep: "",
        caloriesBurned: "",
        appleWatchSynced: false,
        weight: ""
      }));
    } else {
      return initialPlan;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("healthTracker", JSON.stringify(tracker));
    }
  }, [tracker]);

  const toggleCheck = (index, key) => {
    const updated = [...tracker];
    updated[index][key] = !updated[index][key];
    setTracker(updated);
  };

  const updateField = (index, key, value) => {
    const updated = [...tracker];
    updated[index][key] = value;
    setTracker(updated);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">My Health Tracker</h1>
      {tracker.map((entry, index) => (
        <Card key={entry.date} className="mb-4">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">{entry.day} ({entry.date})</h2>
            <div>
              <h3 className="font-semibold">Meals</h3>
              <div><Checkbox checked={entry.breakfastDone} onCheckedChange={() => toggleCheck(index, "breakfastDone")} /> Breakfast: {entry.breakfast}</div>
              <div><Checkbox checked={entry.lunchDone} onCheckedChange={() => toggleCheck(index, "lunchDone")} /> Lunch: {entry.lunch}</div>
              <div><Checkbox checked={entry.dinnerDone} onCheckedChange={() => toggleCheck(index, "dinnerDone")} /> Dinner: {entry.dinner}</div>
            </div>
            <div>
              <h3 className="font-semibold">Workout</h3>
              <div><Checkbox checked={entry.workoutDone} onCheckedChange={() => toggleCheck(index, "workoutDone")} /> Completed</div>
              <ul className="list-disc ml-6">
                {entry.workoutPlan.map((exercise, i) => (
                  <li key={i}>{exercise}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><span>Water (L):</span><Input value={entry.water} onChange={(e) => updateField(index, "water", e.target.value)} /></div>
              <div><span>Sleep (hrs):</span><Input value={entry.sleep} onChange={(e) => updateField(index, "sleep", e.target.value)} /></div>
              <div><span>Calories Burned:</span><Input value={entry.caloriesBurned} onChange={(e) => updateField(index, "caloriesBurned", e.target.value)} /></div>
              <div><span>Weight (kg):</span><Input value={entry.weight} onChange={(e) => updateField(index, "weight", e.target.value)} /></div>
              <div className="flex items-center">
                <Checkbox checked={entry.appleWatchSynced} onCheckedChange={() => toggleCheck(index, "appleWatchSynced")} />
                <span className="ml-2">Apple Watch Synced</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
