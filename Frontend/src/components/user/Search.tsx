import React, { useState } from "react";
import axios from "axios";

interface SearchProps {
  onLocationSelect: (coordinates: [number, number]) => void;
}

const Search: React.FC<SearchProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<any[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) { // Start searching after 3 characters
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            value
          )}.json`,
          {
            params: {
              access_token: import.meta.env.VITE_MAPBOX_ACCESSTOKEN,
              autocomplete: true,
            },
          }
        );
        setOptions(response.data.features);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    } else {
      setOptions([]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a destination, beach, or activity"
        className="px-4 py-3 w-2/3 sm:w-1/2 border border-gray-300 rounded shadow-md"
      />
      <div className="mt-2 bg-white shadow-md rounded w-2/3 sm:w-1/2 max-h-48 overflow-auto">
        {options.map((option) => (
          <div
            key={option.id}
            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            onClick={() => {
              const [longitude, latitude] = option.center;
              onLocationSelect([longitude, latitude]);
              setQuery(option.place_name); // Update input with selected place name
              setOptions([]); // Clear options after selection
            }}
          >
            {option.place_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
