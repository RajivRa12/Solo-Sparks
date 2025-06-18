import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    personalityType: "",
    interests: [],
    goals: [],
    currentMood: "",
    selfCareFrequency: ""
  });

  const steps = [
    {
      title: "Welcome to Solo Sparks ✨",
      subtitle: "Let's create your personalized growth journey",
      component: "welcome"
    },
    {
      title: "Tell us about yourself",
      subtitle: "Help us understand who you are",
      component: "basic-info"
    },
    {
      title: "What describes you best?",
      subtitle: "Choose your personality traits",
      component: "personality"
    },
    {
      title: "What are your interests?",
      subtitle: "Select activities you enjoy",
      component: "interests"
    },
    {
      title: "What are your goals?",
      subtitle: "What would you like to focus on?",
      component: "goals"
    },
    {
      title: "How are you feeling today?",
      subtitle: "Let's start with your current state",
      component: "mood"
    }
  ];

  const personalityOptions = [
    { value: "introvert", label: "Introvert - I recharge through quiet time alone" },
    { value: "extrovert", label: "Extrovert - I gain energy from being around others" },
    { value: "ambivert", label: "Ambivert - I'm a mix of both" }
  ];

  const interestOptions = [
    "Reading & Writing",
    "Arts & Creativity",
    "Nature & Outdoors",
    "Fitness & Wellness",
    "Cooking & Food",
    "Music & Entertainment",
    "Learning & Growth",
    "Mindfulness & Meditation"
  ];

  const goalOptions = [
    "Build self-confidence",
    "Improve emotional intelligence",
    "Practice mindfulness",
    "Develop new skills",
    "Better self-care",
    "Overcome fears",
    "Find inner peace",
    "Increase gratitude"
  ];

  const moodOptions = [
    { value: "excited", label: "Excited & Optimistic", emoji: "🌟" },
    { value: "calm", label: "Calm & Peaceful", emoji: "🌸" },
    { value: "curious", label: "Curious & Open", emoji: "🔍" },
    { value: "reflective", label: "Reflective & Thoughtful", emoji: "🤔" },
    { value: "uncertain", label: "Uncertain & Seeking", emoji: "🌱" }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(profile);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateProfile = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, item) => {
    setProfile(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.component) {
      case "welcome":
        return (
          <div className="text-center space-y-6">
            <div className="text-8xl mb-4">✨</div>
            <p className="text-lg text-gray-600">
              Solo Sparks is your personal companion for self-discovery and growth. 
              We'll create personalized quests to help you fall in love with yourself.
            </p>
            <div className="bg-gradient-to-r from-orange-100 to-pink-100 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                This journey is about you. Take your time, be honest, and remember - 
                every step forward is a victory worth celebrating.
              </p>
            </div>
          </div>
        );

      case "basic-info":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">What should we call you?</Label>
              <Input
                id="name"
                placeholder="Your preferred name"
                value={profile.name}
                onChange={(e) => updateProfile("name", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="age">Age range (optional)</Label>
              <Input
                id="age"
                placeholder="e.g., 25 or 20-30"
                value={profile.age}
                onChange={(e) => updateProfile("age", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        );

      case "personality":
        return (
          <RadioGroup
            value={profile.personalityType}
            onValueChange={(value) => updateProfile("personalityType", value)}
            className="space-y-4"
          >
            {personalityOptions.map((option) => (
              <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-gray-50">
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "interests":
        return (
          <div className="grid grid-cols-2 gap-3">
            {interestOptions.map((interest) => (
              <div
                key={interest}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  profile.interests.includes(interest)
                    ? "bg-orange-100 border-orange-300"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => toggleArrayItem("interests", interest)}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={profile.interests.includes(interest)}
                  />
                  <span className="text-sm">{interest}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case "goals":
        return (
          <div className="grid grid-cols-1 gap-3">
            {goalOptions.map((goal) => (
              <div
                key={goal}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  profile.goals.includes(goal)
                    ? "bg-purple-100 border-purple-300"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => toggleArrayItem("goals", goal)}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={profile.goals.includes(goal)}
                  />
                  <span className="text-sm">{goal}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case "mood":
        return (
          <div className="space-y-3">
            {moodOptions.map((mood) => (
              <div
                key={mood.value}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  profile.currentMood === mood.value
                    ? "bg-pink-100 border-pink-300"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => updateProfile("currentMood", mood.value)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{mood.emoji}</span>
                  <span>{mood.label}</span>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    const step = steps[currentStep];
    switch (step.component) {
      case "welcome":
        return true;
      case "basic-info":
        return profile.name.trim().length > 0;
      case "personality":
        return profile.personalityType.length > 0;
      case "interests":
        return profile.interests.length > 0;
      case "goals":
        return profile.goals.length > 0;
      case "mood":
        return profile.currentMood.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Progress value={(currentStep + 1) / steps.length * 100} className="w-32" />
          </div>
          <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
          <p className="text-gray-600">{steps[currentStep].subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStepContent()}
          
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              {currentStep === steps.length - 1 ? "Start Your Journey" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
