// export const server = "http://localhost:5000";
export const server = "https://streamchat-backend-lt2n.onrender.com";

const apiList = {
    signup: `${server}/api/auth/signup`,
    login: `${server}/api/auth/login`,
    logout: `${server}/api/auth/logout`,
    updateProfile: `${server}/api/auth/update-profile`,
    checkAuth: `${server}/api/auth/check`,
    users: `${server}/api/messages/users`,
    getMessages: `${server}/api/messages`,
    sendMessage: `${server}/api/messages/send`,
}

export default apiList;