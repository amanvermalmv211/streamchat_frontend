import { X } from "lucide-react";
import { useContext } from "react";
import chatContext from "../context/chatContext";
import authContext from "../context/authContext";

const ChatHeader = () => {
    const chatContextElements = useContext(chatContext);
    const { selectedUser, setSelectedUser } = chatContextElements;

    const authContextElements = useContext(authContext);
    const { onlineUsers } = authContextElements;

    return (
        <div className="p-2.5 border-b">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} className="size-10 rounded-full relative object-cover" />
                    </div>

                    {/* User info */}
                    <div>
                        <h3 className="font-medium">{selectedUser.fullName}</h3>
                        <p className="text-sm">
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                {/* Close button */}
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    );
};
export default ChatHeader;