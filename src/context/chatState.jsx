import { useContext, useState } from 'react';
import ChatContext from './chatContext';
import apiList from '../lib/apiList';
import authContext from './authContext';

const ChatState = (props) => {

    const context = useContext(authContext);
    const { socket } = context;

    const [messages, setMessages] = useState([]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);

    const [users, setUsers] = useState([]);
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    const getUsers = async () => {
        setIsUsersLoading(true);
        try {
            const response = await fetch(apiList.users, {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });

            const json = await response.json();
            setUsers(json.users);

        } catch (error) {
            toast.error(json.message);
            console.log("Error in getUsers: ", error);
        } finally {
            setIsUsersLoading(false);
        }
    }

    const getMessages = async (userId) => {
        setIsMessagesLoading(true);
        try {
            const response = await fetch(apiList.getMessages + `/${userId}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });

            const json = await response.json();
            setMessages(json.data);

        } catch (error) {
            toast.error(json.message);
            console.log("Error in getMessage: ", error);
        } finally {
            setIsMessagesLoading(false);
        }
    }

    const sendMessage = async (messageData) => {
        try {
            const response = await fetch(apiList.sendMessage + `/${selectedUser._id}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(messageData),
                credentials: "include"
            });

            const json = await response.json();
            setMessages((prev) => [...prev, json.data]);

        } catch (error) {
            toast.error(json.message);
            console.log("Error in sendMessage: ", error);
        }
    }

    const subscribeToMessages = async (userId) => {
        if(!selectedUser) return;

        socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId !== selectedUser._id) return;
            
            setMessages((prev) => [...prev, newMessage]);
        });
    }

    const unsubscribeFromMessages = async (userId) => {
        socket.off("newMessage")
    }

    return (
        <ChatContext.Provider value={{ messages, isMessagesLoading, users, isUsersLoading, selectedUser, getUsers, getMessages, sendMessage, setSelectedUser, subscribeToMessages, unsubscribeFromMessages }}>
            {
                props.children
            }

        </ChatContext.Provider>
    )
}

export default ChatState;