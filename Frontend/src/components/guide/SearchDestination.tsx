'use client'

import * as React from 'react'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Place } from '@/types/types'


interface SearchDestinationProps {
  onSearch: (place: Place | null) => void
}

export function SearchDestination({ onSearch }: SearchDestinationProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [places, setPlaces] = React.useState<Place[]>([])
  const [loading, setLoading] = React.useState(false)

  const searchPlaces = React.useCallback(async (query: string) => {
    setLoading(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Replace this with your actual API call
    const mockPlaces: Place[] = [
      {
          id: '1',
          name: 'Athirappally Waterfalls',
          description: 'Witness the grandeur of the Niagara of India surrounded by lush greenery.',
          image: '/path-to-image',
          category: 'Waterfalls',
          location: 'Thrissur',
          district: 'Thrissur',
          pincode: '680724',
          images: []
      },
      // Add more places...
    ]
    
    const filtered = mockPlaces.filter(place => 
      place.name.toLowerCase().includes(query.toLowerCase()) ||
      place.location.toLowerCase().includes(query.toLowerCase())
    )
    
    setPlaces(filtered)
    setLoading(false)
  }, [])

  React.useEffect(() => {
    if (searchQuery.length >= 2) {
      const handler = setTimeout(() => {
        searchPlaces(searchQuery)
      }, 300)

      return () => clearTimeout(handler)
    } else {
      setPlaces([])
    }
  }, [searchQuery, searchPlaces])

  return (
    <div className="flex justify-center w-full gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <input
            type="text"
            placeholder="Search for a destination, beach, or activity"
            className="px-4 py-3 w-2/3 sm:w-1/2 border border-gray-300 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={() => setOpen(true)}
          />
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>
                {loading ? (
                  <div className="flex items-center justify-center p-4 text-sm text-gray-500">
                    Searching...
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-4 text-sm text-gray-500">
                    No results found
                  </div>
                )}
              </CommandEmpty>
              <CommandGroup>
                {places.map((place) => (
                  <CommandItem
                    key={place.id}
                    onSelect={() => {
                      onSearch(place)
                      setOpen(false)
                      setSearchQuery(place.name)
                    }}
                  >
                    <div>
                      <div className="font-medium">{place.name}</div>
                      <div className="text-sm text-gray-500">{place.location}, {place.district}</div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <button 
        className="ml-4 bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition-colors"
        onClick={() => onSearch(null)}
      >
        Search
      </button>
    </div>
  )
}