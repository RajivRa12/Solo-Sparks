
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Calendar, Clock } from "lucide-react";
import OnboardingFlow from "@/components/OnboardingFlow";
import QuestCard from "@/components/QuestCard";
import ReflectionModal from "@/components/ReflectionModal";
import MoodSelector from "@/components/MoodSelector";
import ProgressDashboard from "@/components/ProgressDashboard";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentQuest, setCurrentQuest] = useState(null);
  const [sparkPoints, setSparkPoints] = useState(0);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [showReflection, setShowReflection] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Sample quest data - in real app this would come from the intelligent quest engine
  const dailyQuests = [
    {
      id: 1,
      title: "Sunset Reflection",
      description: "Find a peaceful spot to watch the sunset and reflect on three things you're grateful for today.",
      category: "Mindfulness",
      points: 50,
      difficulty: "Easy",
      estimatedTime: "20 minutes",
      completed: false
    },
    {
      id: 2,
      title: "Solo Dessert Adventure",
      description: "Treat yourself to your favorite dessert and savor each bite mindfully, without distractions.",
      category: "Self-Care",
      points: 30,
      difficulty: "Easy",
      estimatedTime: "30 minutes",
      completed: false
    },
    {
      id: 3,
      title: "Letter to Future Self",
      description: "Write a heartfelt letter to yourself one year from now. Share your current dreams and aspirations.",
      category: "Growth",
      points: 75,
      difficulty: "Medium",
      estimatedTime: "45 minutes",
      completed: false
    }
  ];

  const handleOnboardingComplete = (profile) => {
    setUserProfile(profile);
    setShowOnboarding(false);
    // Initialize spark points based on profile completion
    setSparkPoints(100);
  };

  const handleQuestComplete = (questId, reflection) => {
    const quest = dailyQuests.find(q => q.id === questId);
    if (quest) {
      setSparkPoints(prev => prev + quest.points);
      setCompletedQuests(prev => [...prev, { ...quest, reflection, completedAt: new Date() }]);
      setCurrentQuest(null);
      setShowReflection(false);
    }
  };

  const startQuest = (quest) => {
    setCurrentQuest(quest);
    setShowReflection(true);
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with user greeting and points */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {userProfile?.name || 'Spark'} ✨
            </h1>
            <p className="text-gray-600 mt-1">Your journey of self-discovery continues</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              {sparkPoints} Spark Points
            </Badge>
          </div>
        </div>

        {/* Mood selector */}
        <MoodSelector className="mb-8" />

        {/* Progress dashboard */}
        <ProgressDashboard 
          completedQuests={completedQuests}
          sparkPoints={sparkPoints}
          className="mb-8"
        />

        {/* Daily quests section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Today's Quests</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyQuests.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onStart={() => startQuest(quest)}
                isCompleted={completedQuests.some(cq => cq.id === quest.id)}
              />
            ))}
          </div>
        </div>

        {/* Recent reflections */}
        {completedQuests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Reflections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedQuests.slice(-4).map((quest, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{quest.title}</CardTitle>
                    <p className="text-sm text-gray-600">
                      Completed {quest.completedAt.toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {quest.reflection?.text || "Reflection completed"}
                    </p>
                    <Badge variant="outline" className="mt-2">
                      +{quest.points} points earned
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reflection modal */}
      {showReflection && currentQuest && (
        <ReflectionModal
          quest={currentQuest}
          onSubmit={(reflection) => handleQuestComplete(currentQuest.id, reflection)}
          onClose={() => setShowReflection(false)}
        />
      )}
    </div>
  );
};

export default Index;
