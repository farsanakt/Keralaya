// import { useState, useEffect } from "react"
// // import { Avatar as UIAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { User } from "lucide-react"
// import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// interface AvatarProps {
//   src?: string | null
//   alt?: string
//   fallback?: string
//   size?: "sm" | "md" | "lg"
// }

// export function Avatar({ src, alt = "User avatar", fallback, size = "md" }: AvatarProps) {
//   const [error, setError] = useState(false)

//   useEffect(() => {
//     setError(false)
//   }, [])

//   const sizeClasses = {
//     sm: "w-8 h-8",
//     md: "w-12 h-12",
//     lg: "w-24 h-24",
//   }

//   return (
//     <UIAvatar className={sizeClasses[size]}>
//       {src && !error ? (
//         <AvatarImage src={src} alt={alt} onError={() => setError(true)} />
//       ) : (
//         <AvatarFallback>
//           {fallback ? (
//             <span className="text-lg font-medium uppercase">{fallback.slice(0, 2)}</span>
//           ) : (
//             <User className="w-3/4 h-3/4" />
//           )}
//         </AvatarFallback>
//       )}
//     </UIAvatar>
//   )
// }

