
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Camera, Mic } from "lucide-react";

const ReflectionModal = ({ quest, onSubmit, onClose }) => {
  const [reflection, setReflection] = useState({
    text: "",
    photo: null,
    audio: null,
    rating: 0,
    emotions: []
  });

  const emotions = [
    "😊 Happy", "😌 Peaceful", "💪 Empowered", "🤔 Thoughtful", 
    "😍 Grateful", "🌟 Inspired", "😄 Joyful", "🧘 Centered"
  ];

  const handleSubmit = () => {
    if (reflection.text.trim().length === 0) return;
    
    onSubmit({
      ...reflection,
      submittedAt: new Date()
    });
  };

  const toggleEmotion = (emotion) => {
    setReflection(prev => ({
      ...prev,
      emotions: prev.emotions.includes(emotion)
        ? prev.emotions.filter(e => e !== emotion)
        : [...prev.emotions, emotion]
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReflection(prev => ({
          ...prev,
          photo: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Complete Your Quest</DialogTitle>
        </DialogHeader>
        
        {/* Quest Summary */}
        <Card className="bg-gradient-to-r from-orange-50 to-pink-50">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">{quest.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{quest.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{quest.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{quest.points} points</span>
              </div>
              <Badge>{quest.category}</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Text Reflection */}
          <div>
            <Label htmlFor="reflection-text" className="text-base font-medium">
              How did this quest make you feel? What did you discover? *
            </Label>
            <Textarea
              id="reflection-text"
              placeholder="Share your thoughts, insights, or any emotions you experienced during this quest..."
              value={reflection.text}
              onChange={(e) => setReflection(prev => ({ ...prev, text: e.target.value }))}
              className="mt-2 min-h-[120px]"
            />
          </div>

          {/* Emotions */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              What emotions did you experience?
            </Label>
            <div className="flex flex-wrap gap-2">
              {emotions.map((emotion) => (
                <button
                  key={emotion}
                  type="button"
                  onClick={() => toggleEmotion(emotion)}
                  className={`px-3 py-2 rounded-full text-sm transition-colors ${
                    reflection.emotions.includes(emotion)
                      ? 'bg-purple-100 text-purple-800 border border-purple-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              Capture a moment (optional)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              {reflection.photo ? (
                <div className="space-y-3">
                  <img 
                    src={reflection.photo} 
                    alt="Quest reflection" 
                    className="max-w-full max-h-32 mx-auto rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReflection(prev => ({ ...prev, photo: null }))}
                  >
                    Remove Photo
                  </Button>
                </div>
              ) : (
                <div>
                  <Camera className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-3">
                    Share a photo that represents your experience
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <Label
                    htmlFor="photo-upload"
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    Choose Photo
                  </Label>
                </div>
              )}
            </div>
          </div>

          {/* Rating */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              How would you rate this experience?
            </Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReflection(prev => ({ ...prev, rating: star }))}
                  className={`w-8 h-8 ${star <= reflection.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  <Star className="w-full h-full fill-current" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={reflection.text.trim().length === 0}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
          >
            Complete Quest (+{quest.points} points)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReflectionModal;
