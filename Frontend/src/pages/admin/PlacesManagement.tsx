import  { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Place, PlacesTable } from './PlacesTable';
import { approvPlaces, displayLocations } from '@/service/admin/adminApi';

const PlacesManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('pending');
  const [places, setPlaces] = useState<Place[]>([]); 

  const placesDetails = async () => {
    try {
      const response = await displayLocations();
      if (response?.data) {
        setPlaces(
          response.data.map((place: any) => ({
            id: place._id, 
            name: place.name,
            district: place.district,
            street: place.street,
            pincode: place.pincode,
            discription: place.discription,
            images: place.images || [],
            status: place.status,
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  useEffect(() => {
    placesDetails();
    if (location.pathname.includes('approved')) {
      setActiveTab('approved');
    } else {
      setActiveTab('pending');
    }
  }, [location]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/admin/places/${value}`);
  };

  const handleApprove = async(id: string) => {

    const res=await approvPlaces(id,"approved")
    console.log(res)
  };

  const handleReject = async(id: string) => {

    const res=await approvPlaces(id,"rejected")

    console.log(res)
   
  };

  const pendingPlaces = places.filter(place => place.status === 'pending');
  const approvedPlaces = places.filter(place => place.status === 'approved');

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="pending" className="flex-1">
              Pending Places
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex-1">
              Approved Places
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <PlacesTable
              data={pendingPlaces}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </TabsContent>
          
          <TabsContent value="approved">
            <PlacesTable
              data={approvedPlaces}
              showActions={false}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PlacesManagement;
