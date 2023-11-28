import ChatBot from "../pages/chatbot";
import DnDFlow from "../pages/home/dndflowindex";
import ManageChatBot from "../pages/manageChatbot";

export const userRoutes = [
  {
    path: "/",

    element: <ManageChatBot />,
  },
  {
    path: "/chatbot",
    element: <ChatBot />,
  },
  {
    path: "/flowpage",
    element: <DnDFlow />,
  },
];
