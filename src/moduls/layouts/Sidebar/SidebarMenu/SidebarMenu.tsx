import {
  HomeIcon,
  SearchIcon,
  ExploreIcon,
  MessageIcon,
  NotificationIcon,
  CreateIcon,
} from "../../../../shared/components/icons/index";

import { nanoid } from "nanoid";

const sidebarMenu = [
  {
    id: nanoid(),
    icon: <HomeIcon size={24} />,
    toPage: "/",
    text: "Home",
  },
  {
    id: nanoid(),
    icon: <SearchIcon size={24} />,
    toPage: "/search",
    text: "Search",
  },
  {
    id: nanoid(),
    icon: <ExploreIcon size={24} />,
    toPage: "/explore",
    text: "Explore",
  },
  {
    id: nanoid(),
    icon: <MessageIcon size={24} />,
    toPage: "/message",
    text: "Message",
  },
  {
    id: nanoid(),
    icon: <NotificationIcon size={24} />,
    isModal: true,
    text: "Notification",
  },
  {
    id: nanoid(),
    icon: <CreateIcon size={24} />,
    text: "Create",
    isModal: true,
  },
];

export default sidebarMenu;
