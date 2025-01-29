

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AddLocationModal } from "./locationModal"

export function LocationButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add Location</Button>
      <AddLocationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

