

import { create } from "zustand";

export interface SidebarState{
  isOpen:boolean,
  isMinimal:boolean,
  handleOpenOrClose:()=>void,
  handleClose:()=>void,
  handleChangeSideBar:()=>void
}
//sau mũi tên là ngoặc tròn ròi đến ngoặc nhọn
export const useSidebarStore = create<SidebarState>()((set)=>({
  isOpen:false,
  isMinimal:false,
  handleOpenOrClose: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
   handleClose:()=> set((state)=>({...state,isOpen:false})),
   handleChangeSideBar:()=>set((state)=>({...state,isMinimal:!state.isMinimal}))
}))