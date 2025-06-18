
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MoodSelector = ({ className = "" }) => {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { emoji: "🌟", label: "Energetic", color: "from-yellow-400 to-orange-400" },
    { emoji: "😌", label: "Calm", color: "from-blue-400 to-cyan-400" },
    { emoji: "💭", label: "Reflective", color: "from-purple-400 to-pink-400" },
    { emoji: "🌱", label: "Growing", color: "from-green-400 to-emerald-400" },
    { emoji: "✨", label: "Inspired", color: "from-pink-400 to-rose-400" }
  ];

  return (
    <Card className={`${className} bg-white/60 backdrop-blur-sm`}>
      <CardContent className="p-4">
        <h3 className="font-medium text-gray-800 mb-3">How are you feeling right now?</h3>
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => (
            <Button
              key={mood.label}
              variant={selectedMood === mood.label ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMood(mood.label)}
              className={`transition-all duration-200 ${
                selectedMood === mood.label
                  ? `bg-gradient-to-r ${mood.color} text-white border-0 hover:opacity-90`
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{mood.emoji}</span>
              {mood.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodSelector;
