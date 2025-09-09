import { useContext, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { formatMessageTime } from "../lib/utils";
import chatContext from "../context/chatContext";
import authContext from "../context/authContext";

const ChatContainer = () => {
    const chatContextElements = useContext(chatContext);
    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = chatContextElements;

    const authContextElements = useContext(authContext);
    const { authUser } = authContextElements;

    const messageEndRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id);

        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser._id]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div key={message._id} className={`${message.senderId === authUser._id ? "place-self-end" : "place-self-start"}`} ref={messageEndRef} >
                        <div className={`flex ${message.senderId === authUser._id ? "flex-row-reverse" : "flex-row"} gap-2 items-end`}>
                            <img src={
                                message.senderId === authUser._id
                                    ? authUser.profilePic || "/avatar.png"
                                    : selectedUser.profilePic || "/avatar.png"
                            }
                                alt="profile pic" className="size-8 rounded-full border overflow-hidden object-cover" />
                            <div>
                                <div className="text-xs opacity-50 ml-1 mb-1">
                                    {formatMessageTime(message.createdAt)}
                                </div>
                                <div className="border border-white/30 shadow-md shadow-black/30 inline-block p-1 rounded-lg w max-w-80 bg-slate-900">
                                    {message.image && (
                                        <div className="">
                                            <img
                                            src={message.image}
                                            alt="Attachment"
                                            className="w-full rounded-md mb-2 mx-auto object-contain"
                                        />
                                        </div>
                                    )}
                                    {message.text && <p>{message.text}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <MessageInput />
        </div>
    );
};
export default ChatContainer;