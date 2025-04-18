import { RootState } from '@/redux/store';
import {  guideSlot, slotmanagement } from '@/service/guide/guideApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface GuideSlotCalendarProps {
  initialDate?: Date;
  onSubmit?: (dates: string[]) => void;
  title?: string;
}

interface AvailableDateItem {
  date: string;
  isBlocked: boolean;
  isBooked: boolean;
  _id: string;
}

interface GuideData {
  availability?: {
    availableDates: AvailableDateItem[];
    createdAt: string;
    guideId: string;
    updatedAt: string;
    
  };
  guide?: {
    charge: string;
    district: string;
    email: string;
    experience: string;
    expertise: string;
    isBlocked: boolean;
    languages: string[];
    name: string;
    password: string;
    phone: string;
    profileImage: string;
    
  };
}

const GuideSlotCalendar: React.FC<GuideSlotCalendarProps> = ({
  initialDate = new Date(),
  title = "Availability Calendar"
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [guideData, setGuideData] = useState<GuideData | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const { currentGuide } = useSelector((state: RootState) => state.guide);
  const email = (currentGuide?.data as unknown) as string
  
  const fetchGuideDetails = async (email: any) => {
    try {
      setIsLoading(true);
      const response = await slotmanagement(email);
      setGuideData(response.data)
      console.log("Guide data loaded:", response);
      
      
      if (response?.data?.availability?.availableDates && response.data.availability.availableDates.length > 0) {
        const formattedSlots = response.data.availability.availableDates
          .filter((slot: AvailableDateItem) => !slot.isBlocked && !slot.isBooked)
          .map((slot: AvailableDateItem) => slot.date.split('T')[0]);
        
        if (!isEditMode) {
          setSelectedDates(formattedSlots);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching guide details:", error);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (email) {
      fetchGuideDetails(email);
    }
  }, [email, isEditMode]);
  
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const formatDateToString = (date: Date): string => {
    // Use toISOString with local timezone to avoid date shift
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().split("T")[0];
  };
  
  const handleDateClick = (day: number | null): void => {
    if (!day || !isEditMode) return;
  
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
  
    if (clickedDate < today) return;
  
    const dateString = formatDateToString(clickedDate);
  
    setSelectedDates(prevDates =>
      prevDates.includes(dateString)
        ? prevDates.filter(date => date !== dateString)
        : [...prevDates, dateString]
    );
  };
  
  const prevMonth = (): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = (): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const handleEditToggle = () => {
    if (isEditMode) {
      // Discard changes and reload from server
      fetchGuideDetails(email);
    } else {
      // Load current slots into edit mode
      if (guideData?.availability?.availableDates) {
        const formattedSlots = guideData.availability.availableDates
          .filter((slot: AvailableDateItem) => !slot.isBlocked && !slot.isBooked)
          .map((slot: AvailableDateItem) => slot.date.split('T')[0]);
        setSelectedDates(formattedSlots);
      }
    }
    setIsEditMode(!isEditMode);
  };
  
  const submitDates = async () => {
    if (selectedDates.length === 0) {
      toast.error("Please select at least one date.");
      return;
    }

    // Debug logging to verify dates
    console.log('Selected Dates (Before Submission):', selectedDates);

    try {
      // Ensure dates are in correct local format
      const formattedDates = selectedDates.map(dateStr => {
        const date = new Date(dateStr);
        // Add one day to compensate for potential timezone issues
        date.setDate(date.getDate());
        return formatDateToString(date);
      });

      console.log('Formatted Dates (For Submission):', formattedDates);

      const response = await guideSlot(formattedDates, email);

      console.log(response)
      
      toast.success('Slots updated successfully!');
      setIsEditMode(false);
      fetchGuideDetails(email);
    } catch (error) {
      console.error("Error saving slots:", error);
      toast.error("Failed to save slots. Please try again.");
    }
  };
  
  const renderCalendar = (): JSX.Element[] => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    
    const days: (number | null)[] = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    const weeks: (number | null)[][] = [];
    let week: (number | null)[] = [];
    
    days.forEach((day, index) => {
      week.push(day);
      if (index % 7 === 6 || index === days.length - 1) {
        weeks.push(week);
        week = [];
      }
    });
    
    return weeks.map((week, weekIndex) => (
      <div key={`week-${weekIndex}`} className="grid grid-cols-7">
        {week.map((day, dayIndex) => {
          if (day === null) {
            return <div key={`empty-${dayIndex}`} className="h-12 border border-gray-100 bg-gray-50"></div>;
          }
          
          const dateObj = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          );
          
          const dateString = formatDateToString(dateObj);
          const isPastDate = dateObj < today;
          const isSelected = selectedDates.includes(dateString);
          
          
          const isBooked = guideData?.availability?.availableDates?.some(slot => 
            slot.date.split('T')[0] === dateString && slot.isBooked
          );
          
          const isBlocked = guideData?.availability?.availableDates?.some(slot => 
            slot.date.split('T')[0] === dateString && slot.isBlocked
          );
          
          return (
            <div
              key={`day-${day}`}
              onClick={() => handleDateClick(day)}
              className={`h-12 border border-gray-200 flex items-center justify-center relative cursor-pointer transition-colors duration-150
                ${isPastDate ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 
                  isBooked ? 'bg-red-500 text-white cursor-not-allowed' :
                  isBlocked ? 'bg-gray-400 text-white cursor-not-allowed' :
                  isSelected ? (isEditMode ? 'bg-black text-white' : 'bg-blue-600 text-white') : 
                  isEditMode ? 'hover:bg-gray-200' : ''}`
              }
              style={{ cursor: (isEditMode && !isPastDate && !isBooked && !isBlocked) || (!isEditMode && isSelected) ? 'pointer' : 'default' }}
            >
              <span className="text-sm">{day}</span>
              {isBooked && <span className="absolute bottom-1 left-0 right-0 text-xs text-center">Booked</span>}
            </div>
          );
        })}
      </div>
    ));
  };
  
  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold text-black">{title}</h1>
        {guideData?.guide?.name && (
          <p className="text-gray-600 mt-1">Guide: {guideData.guide.name}</p>
        )}
      </div>
      
      <div className="w-full h-px bg-gray-300"></div>
      
      <div className="p-4 bg-black text-white flex justify-between items-center">
        <button onClick={prevMonth} className="text-white p-2 rounded hover:bg-gray-800 transition-colors duration-150">
          &larr;
        </button>
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={nextMonth} className="text-white p-2 rounded hover:bg-gray-800 transition-colors duration-150">
          &rarr;
        </button>
      </div>
      
      <div className="grid grid-cols-7 bg-gray-100">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-2 text-center text-sm font-medium text-gray-800">
            {day}
          </div>
        ))}
      </div>
      
      <div className="p-2">
        {isLoading ? (
          <div className="text-center py-10">Loading availability slots...</div>
        ) : (
          renderCalendar()
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-4 flex-wrap">
          <div className="flex items-center mr-4 mb-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded mr-2"></div>
            <span className="text-sm">Past Dates</span>
          </div>
          <div className="flex items-center mr-4 mb-2">
            <div className="w-4 h-4 bg-blue-600 border border-blue-600 rounded mr-2"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center mr-4 mb-2">
            <div className="w-4 h-4 bg-red-500 border border-red-500 rounded mr-2"></div>
            <span className="text-sm">Booked</span>
          </div>
          <div className="flex items-center mr-4 mb-2">
            <div className="w-4 h-4 bg-gray-400 border border-gray-400 rounded mr-2"></div>
            <span className="text-sm">Blocked</span>
          </div>
          {isEditMode && (
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-black border border-black rounded mr-2"></div>
              <span className="text-sm">Selected</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">
            {isEditMode 
              ? `Selected: ${selectedDates.length} dates` 
              : `Available: ${guideData?.availability?.availableDates?.filter(slot => !slot.isBlocked && !slot.isBooked).length || 0} dates`
            }
          </p>
          <div className="flex space-x-2">
            {guideData?.availability?.availableDates && guideData.availability.availableDates.length > 0 && !isEditMode && (
              <button 
                onClick={handleEditToggle} 
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-150"
              >
                Edit Slots
              </button>
            )}
            
            {isEditMode && (
              <>
                <button 
                  onClick={handleEditToggle} 
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button 
                  onClick={submitDates} 
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-150"
                  disabled={selectedDates.length === 0}
                >
                  Save Changes
                </button>
              </>
            )}
            
            {(!guideData?.availability?.availableDates || guideData.availability.availableDates.length === 0) && !isEditMode && (
              <button 
                onClick={handleEditToggle} 
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-150"
              >
                Add Availability
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideSlotCalendar;