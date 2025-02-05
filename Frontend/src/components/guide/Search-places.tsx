"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"
import { Place } from "@/types/types"
import { searchPlaces } from "./Search"
// import { searchPlaces } from "../actions/search"
// import type { Place } from "../types/types"

export function SearchPlaces() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [places, setPlaces] = React.useState<Place[]>([])
  const [selectedPlace, setSelectedPlace] = React.useState<Place | null>(null)
  const [loading, setLoading] = React.useState(false)

  const debouncedSearch = React.useCallback(async (query: string) => {
    if (query.length < 2) return
    setLoading(true)
    try {
      const results = await searchPlaces(query)
      setPlaces(results)
    } catch (error) {
      console.error("Failed to search places:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    const handler = setTimeout(() => {
      debouncedSearch(value)
    }, 300)

    return () => clearTimeout(handler)
  }, [value, debouncedSearch])

  return (
    <div className="flex flex-col items-center space-y-8">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-[300px] justify-between">
            {value ? places.find((place) => place.name === value)?.name : "Search for a destination..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search for a place..." value={value} onValueChange={setValue} />
            <CommandList>
              <CommandEmpty>{loading ? "Searching..." : "No places found."}</CommandEmpty>
              <CommandGroup>
                {places.map((place) => (
                  <CommandItem
                    key={place.id}
                    value={place.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue)
                      setSelectedPlace(place)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === place.name ? "opacity-100" : "opacity-0")} />
                    {place.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedPlace && (
        <Card className="w-full max-w-2xl">
          <CardContent className="p-6">
            <div className="grid gap-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{selectedPlace.name}</h2>
                <p className="text-gray-500">{selectedPlace.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative aspect-[4/3]">
                  <img
                    src={selectedPlace.image || "/placeholder.svg"}
                    alt={selectedPlace.name}
                    className="object-cover rounded-lg w-full h-full"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Details:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Category: {selectedPlace.category}</li>
                  <li>Location: {selectedPlace.location}</li>
                  <li>District: {selectedPlace.district}</li>
                  <li>Pincode: {selectedPlace.pincode}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

