import { ToolItemProps } from "./components/dashboard/tools-item";

// Không cần khai báo lại ToolItemProps ở đây
export const TOOLS: ToolItemProps[] = [
  {
    title: "AI Chat",
    icon: "chat.png",
    url: "/conversation",
    color: "bg-blue-500",
    slug: "conversation",
  },
  {
    title: "Image Creator",
    icon: "img.png",
    url: "/photo",
    color: "bg-violet-500",
    slug: "photo",
  },
  {
    title: "XRPL Helper",
    icon: "/tools.png",
    url: "/tools",
    color: "bg-amber-500",
    slug: "tools",
  },
  {
    title: "Music Maker",
    icon: "music.png",
    url: "/audio",
    color: "bg-orange-500",
    slug: "audio",
  },
  {
    title: "Code Assistant",
    icon: "code.png",
    url: "/code",
    color: "bg-green-500",
    slug: "code",
  },
];

// Định nghĩa NAVIGATIONS
export const NAVIGATIONS = [
  {
    title: "Dashboard",
    icon: "da.png",
    url: "/dashboard",
    slug: "dashboard"
  },
  ...TOOLS, // TOOLS là một mảng hợp lệ và có kiểu ToolItemProps[]
];


export const THEME_MODES = [
  {
    label: "Light",
    value: "light"
  },
  {
    label: "Dark",
    value: "dark"
  },
];

export const MAX_FREE_COUNTS = 5;
export const DAY_IN_MS = 86_400_000;

export const PHOTO_AMOUNT_OPTIONS = [
  {
    value: "1",
    label: "1 Photo"
  },
  {
    value: "2",
    label: "2 Photos"
  },
  {
    value: "3",
    label: "3 Photos"
  },
  // {
  //   value: "4",
  //   label: "4 Photos"
  // },
  // {
  //   value: "5",
  //   label: "5 Photos"
  // }
];

export const PHOTO_RESOLUTION_OPTIONS = [
  {
    value: "1792x1024",
    label: "1792x1024",
  },
  {
    value: "1024x1792",
    label: "1024x1792",
  },
  {
    value: "1024x1024",
    label: "1024x1024",
  },
];

export const MODEL_OPTIONS = [
  {
    value: "dall-e-2",
    label: "Base",
  },
  {
    value: "dall-e-3",
    label: "Pro",
  },
];