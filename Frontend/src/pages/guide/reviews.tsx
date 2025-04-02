import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, MessageCircle } from "lucide-react";
import Sidebar from '@/components/guide/Sidebar';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { guideReviews } from '@/service/guide/guideApi';


interface Review {
  _id: string;
  email: string;
  username: string;
  comment: string;
  rating: number;
}

interface ReviewData {
  averageRating: number;
  reviews: Review[];
}

const GuideReviews: React.FC = () => {
  const { currentGuide } = useSelector((state: RootState) => state.guide);
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Star Rating Component
  const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star 
            key={index} 
            className={`h-5 w-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`} 
            fill={index < rating ? '#eab308' : 'none'}
          />
        ))}
        <span className="ml-2 text-sm text-gray-500">({rating}/5)</span>
      </div>
    );
  };

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const email: string = typeof currentGuide?.data === "string" ? currentGuide?.data : "";
      
      if (!email) {
        setError("No guide email provided");
        return;
      }

      const response = await guideReviews(email);
      setReviewData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch reviews");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [currentGuide]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Overall Rating */}
          <div className="bg-gray-100 rounded-lg p-6 mb-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Guide Reviews</h2>
            <div className="flex justify-center items-center space-x-4">
              <div className="text-5xl font-bold text-primary">
                {reviewData?.averageRating?.toFixed(1) || 'N/A'}
              </div>
              <div>
                <StarRating rating={Math.round(reviewData?.averageRating || 0)} />
                <p className="text-gray-500">
                  {reviewData?.reviews?.length || 0} Reviews
                </p>
              </div>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-4">
            {reviewData?.reviews?.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                <p>No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              reviewData?.reviews?.map((review) => (
                <Card 
                  key={review._id} 
                  className="hover:shadow-lg transition-shadow duration-300 border-gray-200"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{review.username.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{review.username}</h3>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideReviews;