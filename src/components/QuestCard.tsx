
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star } from "lucide-react";

const QuestCard = ({ quest, onStart, isCompleted }) => {
  const getCategoryColor = (category) => {
    const colors = {
      "Mindfulness": "bg-blue-100 text-blue-800",
      "Self-Care": "bg-green-100 text-green-800",
      "Growth": "bg-purple-100 text-purple-800",
      "Adventure": "bg-orange-100 text-orange-800",
      "Creativity": "bg-pink-100 text-pink-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      "Easy": "bg-green-50 text-green-700 border-green-200",
      "Medium": "bg-yellow-50 text-yellow-700 border-yellow-200",
      "Hard": "bg-red-50 text-red-700 border-red-200"
    };
    return colors[difficulty] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <Card className={`h-full transition-all duration-300 hover:shadow-lg ${
      isCompleted ? 'bg-green-50 border-green-200' : 'bg-white/80 backdrop-blur-sm hover:bg-white/90'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge className={getCategoryColor(quest.category)}>
            {quest.category}
          </Badge>
          <Badge variant="outline" className={getDifficultyColor(quest.difficulty)}>
            {quest.difficulty}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight">{quest.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm leading-relaxed">
          {quest.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{quest.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{quest.points} points</span>
          </div>
        </div>
        
        <Button
          onClick={() => onStart(quest)}
          disabled={isCompleted}
          className={`w-full ${
            isCompleted
              ? 'bg-green-500 hover:bg-green-500'
              : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600'
          }`}
        >
          {isCompleted ? '✓ Completed' : 'Start Quest'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuestCard;
