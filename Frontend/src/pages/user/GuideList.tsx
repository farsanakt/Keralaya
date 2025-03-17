import React, { useEffect, useState } from 'react';
import { Star, Heart, Calendar, Globe2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UserFooter from '@/components/user/UserFooter';
import UserHeader from '@/components/user/UserHeader';
import { allGuide } from '@/service/guide/guideApi';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface Guide {
  _id: string;
  name: string;
  profileImage: string;
  experience: number;
  reviewCount: number;
  rating: number;
  pricePerDay: number;
  languages: string[];
  availability: {
    nextAvailable: string;
    availableDays: string[];
  };
  district: string
}

const GuideList: React.FC = () => {

  const {locationId}=useParams()

  const navigate=useNavigate()
  const [guides, setGuides] = useState<Guide[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');

  const fetchGuides = async () => {
    try {
      const response = await allGuide();
      const guidesData = response.data.map((guide: any) => ({
        id: guide._id,
        name: guide.name,
        charge:guide.charge,
        image: guide.profileImage || '/api/placeholder/150/150',
        experience: guide.experience || 0,
        reviewCount: guide.reviewCount || 0,
        rating: guide.rating || 0,
        pricePerDay: guide.pricePerDay || 0,
        languages: guide.languages || [],
        availability: {
          nextAvailable: guide.availability?.nextAvailable || 'N/A',
          availableDays: guide.availability?.availableDays || []
        },
        district: guide.district || 'N/A'
      }));
      setGuides(guidesData);

      // Extract unique districts
      const uniqueDistricts = Array.from(new Set(guidesData.map((g: Guide) => g.district)));
      setDistricts(uniqueDistricts);
    } catch (error) {
      console.error('Error fetching guides:', error);
    }
  };

  const handleSelect=async(id:any)=>{

    console.log('hhhhh')

    console.log(id)

    if(id){
      navigate(`/guidedetails/${id}/${locationId}`)
    }

  }

  useEffect(() => {
    fetchGuides();
    console.log('loc',locationId)
  }, []);

  const filteredGuides = selectedDistrict
    ? guides.filter(guide => guide.district === selectedDistrict)
    : guides;

  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Perfect Local Guide</h1>
            
            {/* District Dropdown */}
            <div className="mb-6">
              <label htmlFor="district" className="block text-sm font-medium text-gray-700">Select District</label>
              <select
                id="district"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">All Districts</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <Card 
                  key={guide._id} 
                  className="group relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                >
                  <CardHeader className="relative pb-0">
                    <div className="absolute top-4 right-4 z-10">
                      <button 
                        className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transform transition-transform duration-300 group-hover:scale-110"
                      >
                        <Heart className="w-4 h-4 text-gray-600 transition-colors duration-300 group-hover:text-red-500" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16 transition-transform duration-300 group-hover:scale-105">
                        <AvatarImage src={guide.image} alt={guide.name} />
                        <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors duration-300">
                          {guide.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {guide.experience} years experience
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{guide.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-gray-500">•</span>
                      <span className="text-sm text-gray-500">
                        {guide.reviewCount} reviews
                      </span>
                    </div>

                    <div className="flex items-center mb-3">
                      <Globe2 className="w-4 h-4 text-gray-500 mr-2" />
                      <div className="flex flex-wrap gap-1">
                        {guide.languages.map((lang) => (
                          <Badge 
                            key={lang} 
                            variant="secondary" 
                            className="text-xs transition-all duration-300 group-hover:bg-blue-100"
                          >
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center mb-3">
                      <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm">
                        Next available: {guide.availability.nextAvailable}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="text-lg font-semibold">
                        ${guide.charge}
                        <span className="text-sm text-gray-500 font-normal"> / day</span>
                      </div>
                      <button onClick={()=>{handleSelect(guide.id)}} className="bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 transform group-hover:bg-blue-700 group-hover:scale-105">
                        Book Now
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <UserFooter />
    </div>
  );
};

export default GuideList;