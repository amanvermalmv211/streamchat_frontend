import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useContext } from "react";
import chatContext from "../context/chatContext";

const HomePage = () => {

  const context = useContext(chatContext);
  const { selectedUser } = context;

  return (
    <div className="h-screen bg-slate-800 text-gray-200 pt-16">
      <div className="flex h-full overflow-hidden">
        <Sidebar />

        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
};

export default HomePage;