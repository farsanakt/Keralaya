// src/components/PlacesTable.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

export interface Place {
  id: string;
  name: string;
  district: string;
  images: string[];
  status: 'pending' | 'approved';
}

export interface PlacesTableProps {
  data: Place[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  showActions?: boolean;
}

export const PlacesTable: React.FC<PlacesTableProps> = ({ 
  data, 
  onApprove, 
  onReject, 
  showActions = true 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left font-medium text-gray-600">Name</th>
            <th className="p-4 text-left font-medium text-gray-600">District</th>
            <th className="p-4 text-left font-medium text-gray-600">Images</th>
            <th className="p-4 text-left font-medium text-gray-600">Status</th>
            {showActions && (
              <th className="p-4 text-left font-medium text-gray-600">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((place) => (
            <tr key={place.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4">{place.name}</td>
              <td className="p-4">{place.district}</td>
              <td className="p-4">
                <div className="flex space-x-2">
                  {place.images.map((image, index) => (
                    <div key={index} className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={image}
                        alt={`${place.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    place.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {place.status}
                </span>
              </td>
              {showActions && place.status === 'pending' && (
                <td className="p-4">
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => onApprove?.(place.id)}
                      className="bg-green-500 hover:bg-green-600"
                      size="sm"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => onReject?.(place.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};