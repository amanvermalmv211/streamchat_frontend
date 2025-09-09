import { useState } from "react";
import AuthContext from "./authContext";
import apiList, { server } from '../lib/apiList.js';
import toast from "react-hot-toast";
import { io } from 'socket.io-client';

const AuthState = (props) => {

    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [socket, setSocket] = useState(null);

    const checkAuth = async () => {
        try {
            const response = await fetch(apiList.checkAuth, {
                method: 'GET',
                credentials: "include"
            });

            const json = await response.json();
            setAuthUser(json.user);
            connectSocket();
            setIsCheckingAuth(false);

        } catch (error) {
            console.log("Error in checkAuthK: ", error);
            setAuthUser(null);
        }
    }

    const signup = async (data) => {
        setIsSigningUp(true);
        try {
            const response = await fetch(apiList.signup, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: "include"
            });

            const json = await response.json();
            setAuthUser(json.user);
            toast.success(json.message);
            connectSocket();

        } catch (error) {
            console.log("Error in signup: ", error);
            setAuthUser(null);
        } finally {
            setIsSigningUp(false);
        }
    }

    const login = async (data) => {
        setIsLoggingIn(true);
        try {
            const response = await fetch(apiList.login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: "include"
            });

            const json = await response.json();
            setAuthUser(json.user);
            toast.success(json.message);
            connectSocket();

        } catch (error) {
            console.log("Error in login: ", error);
            setAuthUser(null);
        } finally {
            setIsLoggingIn(false);
        }
    }

    const updateProfile = async (profilePic) => {
        setIsUpdatingProfile(true);
        try {
            const response = await fetch(apiList.updateProfile, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profilePic),
                credentials: "include"
            });

            const json = await response.json();
            setAuthUser(json.user);
            toast.success(json.message);

        } catch (error) {
            toast.error(json.message);
            console.log("Error in updateProfile: ", error);
        } finally {
            setIsUpdatingProfile(false);
        }
    }

    const logout = async () => {
        try {
            const response = await fetch(apiList.logout, {
                method: 'POST',
                credentials: "include"
            });

            const json = await response.json();
            setAuthUser(null);
            disconnectSocket();
            toast.success(json.message);

        } catch (error) {
            console.log("Error in logout: ", error);
            setAuthUser(null);
        }
    }

    const connectSocket = async () => {
        if (!authUser || socket?.connected) return;

        const socketServer = io(server, {
            query: { userId: authUser?._id },
            withCredentials: true,
            transports: ["websocket"] // optional, but helps on Render
        });
        socketServer.connect();
        setSocket(socketServer);

        socketServer.on("getOnlineUsers", (userIds) => {
            setOnlineUsers(userIds);
        });

    }

    const disconnectSocket = async () => {
        if (socket?.connected) {
            socket.io.opts.reconnection = false; // stop auto-reconnect
            socket.removeAllListeners();
            socket.disconnect();
            setSocket(null);
        }
    }

    return (
        <AuthContext.Provider value={{ authUser, isSigningUp, isLoggingIn, isUpdatingProfile, isCheckingAuth, onlineUsers, socket, checkAuth, signup, login, updateProfile, logout }}>
            {
                props.children
            }
        </AuthContext.Provider>
    )
}

export default AuthState;