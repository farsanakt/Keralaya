
import { Card} from "@/components/ui/card"


import { ImageCarousel } from "@/components/ui/image-carousel"
import { Place } from "@/types/types"
// import type { Place } from "../types/types"

interface PlaceCardProps {
  place: Place
  onSelect?: (place: Place) => void
}

export function PlaceCard({ place}: PlaceCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <ImageCarousel images={place.images} />
      {/* <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-green-900 line-clamp-1">{place.name}</h3>
            <p className="text-sm text-gray-500">
              {place.location}, {place.district}
            </p>
          </div>
          {place.rating && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              {place.rating}
            </Badge>
          )}
        </div>
      </CardHeader> */}
      {/* <CardContent className="p-4 pt-0">
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{place.description}</p>
        {place.highlights && (
          <div className="flex flex-wrap gap-2 mb-4">
            {place.highlights.slice(0, 3).map((highlight, index) => (
              <Badge key={index} variant="outline" className="bg-green-50">
                {highlight}
              </Badge>
            ))}
          </div>
        )}
        <Button className="w-full bg-green-700 hover:bg-green-800" onClick={() => onSelect?.(place)}>
          Explore More
        </Button>
      </CardContent> */}
    </Card>
  )
}

