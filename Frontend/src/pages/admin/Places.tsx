// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { MapPin, ImageIcon, Trash2, Edit } from "lucide-react"
// import { displaylocation } from "@/service/guide/guideApi"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { LocationButton } from "../guide/locationButton"


// interface Place {
//   id: string
//   name: string
//   district: string
//   street: string
//   pincode: string
//   images: string[]
// }

// const ITEMS_PER_PAGE = 6

// export const AdminPlaces = () => {
//   const [places, setPlaces] = useState<Place[]>([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [selectedPlaces, setSelectedPlaces] = useState<Record<string, boolean>>({})
  

//   const totalPages = Math.ceil(places.length / ITEMS_PER_PAGE)
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
//   const endIndex = startIndex + ITEMS_PER_PAGE
//   const currentPlaces = places.slice(startIndex, endIndex)

//   const fetchPlaces = async () => {
//     const response = await displaylocation()
//     console.log(response, "placesss")
//     if (response.data) {
//       const transformedPlaces = response.data.map((item: any) => ({
//         id: item._id,
//         name: item.name,
//         district: item.district,
//         street: item.street,
//         pincode: item.pincode,
//         images: item.images || ["/placeholder.svg"],
//       }))
//       setPlaces(transformedPlaces)
//     }
//   }

//   useEffect(() => {
//     fetchPlaces()
//   }, [])

//   const handleDelete = async (id: string) => {
    
//     console.log("Deleting place with id:", id)

    
    
//     await fetchPlaces()
//   }





//   const toggleDetails = (id: string) => {
//     setSelectedPlaces((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }))
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-center mb-6">Manage Places</h1>
//       <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform rotate-[0.1deg] shadow-lg mb-12"></div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//         {currentPlaces.map((place) => (
//           <Card key={place.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
//             <CardHeader className="pb-2">
//               <CardTitle className="text-xl font-semibold truncate">{place.name}</CardTitle>
//             </CardHeader>
//             <CardContent className="flex-grow p-4">
//               <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
//                 <img
//                   src={place.images[0] || "/placeholder.svg"}
//                   alt={place.name}
//                   className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                 />
//                 <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
//                   <ImageIcon className="w-3 h-3 inline mr-1" />
//                   {place.images.length}
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex items-center text-sm text-muted-foreground">
//                   <MapPin className="w-4 h-4 mr-2" />
//                   <span>{place.district}</span>
//                 </div>
//                 <p className="text-sm">{place.street}</p>
//                 <p className="text-sm">Pincode: {place.pincode}</p>
//               </div>
//             </CardContent>
//             <CardFooter className="p-4 pt-0 flex flex-col gap-2">
//               <div className="flex justify-between w-full">
//                 <Button variant="outline" size="sm" className="flex-1 mr-2">
//                   <Edit className="w-4 h-4 mr-2" />
//                   Edit
//                 </Button>
//                 <Button variant="destructive" size="sm" onClick={() => handleDelete(place.id)} className="flex-1 ml-2">
//                   <Trash2 className="w-4 h-4 mr-2" />
//                   Delete
//                 </Button>
//               </div>
//               <Button variant="outline" className="w-full" onClick={() => toggleDetails(place.id)}>
//                 {selectedPlaces[place.id] ? "Hide Details" : "View Details"}
//               </Button>
//             </CardFooter>
//             {selectedPlaces[place.id] && place.images.length > 1 && (
//               <ScrollArea className="h-40 px-4 pb-4">
//                 <div className="grid grid-cols-3 gap-2">
//                   {place.images.slice(1).map((image, index) => (
//                     <img
//                       key={index}
//                       src={image || "/placeholder.svg"}
//                       alt={`${place.name} ${index + 2}`}
//                       className="w-full h-24 object-cover rounded-md"
//                     />
//                   ))}
//                 </div>
//               </ScrollArea>
//             )}
//           </Card>
//         ))}
//       </div>

//       <div className="flex justify-between items-center mb-12">
//         <Button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           variant="outline"
//         >
//           Previous
//         </Button>
//         <span className="text-lg font-medium">
//           Page {currentPage} of {totalPages}
//         </span>
//         <Button
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//           variant="outline"
//         >
//           Next
//         </Button>
//       </div>

//       <div className="flex justify-center">
//         <LocationButton />
//       </div>

//       {/* {editingPlace && (
//         <EditLocationModal place={editingPlace} onClose={() => setEditingPlace(null)} onSave={handleEditSave} />
//       )} */}
//     </div>
//   )
// }

// export default AdminPlaces

