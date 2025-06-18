
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Clock } from "lucide-react";

const ProgressDashboard = ({ completedQuests, sparkPoints, className = "" }) => {
  const questsThisWeek = completedQuests.filter(quest => {
    const questDate = new Date(quest.completedAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return questDate > weekAgo;
  }).length;

  const totalQuestsTarget = 7; // Weekly target
  const weeklyProgress = (questsThisWeek / totalQuestsTarget) * 100;

  const getNextReward = () => {
    if (sparkPoints < 200) return { points: 200, reward: "Profile Boost" };
    if (sparkPoints < 500) return { points: 500, reward: "Exclusive Content" };
    if (sparkPoints < 1000) return { points: 1000, reward: "Premium Quest Pack" };
    return { points: 2000, reward: "Special Recognition Badge" };
  };

  const nextReward = getNextReward();
  const rewardProgress = (sparkPoints / nextReward.points) * 100;

  const getStreak = () => {
    if (completedQuests.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    let checkDate = new Date(today);
    
    for (let i = 0; i < 30; i++) {
      const hasQuestOnDate = completedQuests.some(quest => {
        const questDate = new Date(quest.completedAt);
        return questDate.toDateString() === checkDate.toDateString();
      });
      
      if (hasQuestOnDate) {
        streak++;
      } else if (streak > 0) {
        break;
      }
      
      checkDate.setDate(checkDate.getDate() - 1);
    }
    
    return streak;
  };

  const currentStreak = getStreak();

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {/* Weekly Progress */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Quests completed</span>
              <span className="font-medium">{questsThisWeek}/{totalQuestsTarget}</span>
            </div>
            <Progress value={weeklyProgress} className="h-2" />
            <p className="text-xs text-gray-600">
              {weeklyProgress >= 100 ? 'Amazing! You hit your weekly goal!' : 'Keep going! You\'re doing great!'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Streak Counter */}
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            Current Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {currentStreak}
            </div>
            <p className="text-sm text-gray-600">
              {currentStreak === 0 ? 'Start your journey!' : 
               currentStreak === 1 ? 'Great start!' :
               currentStreak < 7 ? 'Building momentum!' :
               'You\'re on fire! 🔥'}
            </p>
            {currentStreak > 0 && (
              <Badge variant="outline" className="mt-2 text-orange-700 border-orange-300">
                {currentStreak} day{currentStreak !== 1 ? 's' : ''} strong
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Next Reward */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="w-5 h-5 text-purple-600" />
            Next Reward
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{nextReward.reward}</span>
              <span className="font-medium">{sparkPoints}/{nextReward.points}</span>
            </div>
            <Progress value={rewardProgress} className="h-2" />
            <p className="text-xs text-gray-600">
              {nextReward.points - sparkPoints} more points to unlock!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressDashboard;
