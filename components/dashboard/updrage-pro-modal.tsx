"use client"
import {
  Dialog,
  DialogContent,
 
} from "@/components/ui/dialog"
import SubscriptionButton from "../subscription-button"
import { useProState } from "@/store/pro-store"

interface UpdrageProModalProps {
  isProPlan?: boolean,

}

const UpdrageProModal:React.FC<UpdrageProModalProps> = ({ isProPlan }) => {

  const {isOpen,handleCloseProModal,handleOpenOrCloseProModal} = useProState()
  return (
    <div>
      <Dialog open={isOpen}>
   
      <DialogContent
        onClose={()=>{}}
        showOverPlay
       >
         <SubscriptionButton isPro={isProPlan}/>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default UpdrageProModal