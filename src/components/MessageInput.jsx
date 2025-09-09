import { useContext, useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import chatContext from "../context/chatContext";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const fileInputRef = useRef(null);

    const context = useContext(chatContext);
    const { sendMessage } = context;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (isSendingMessage) return;

        setIsSendingMessage(true);

        if (!text.trim() && !imagePreview) return;

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            // Clear form
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
        }
        finally {
            setIsSendingMessage(false);
        }
    };

    return (
        <div className="p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button onClick={removeImage} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center" type="button">
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full bg-slate-900 rounded-lg p-2.5"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className={`hidden sm:flex border h-12 w-12 p-2 rounded-lg items-center justify-center ${imagePreview ? "text-emerald-500 border-emerald-500" : "text-zinc-400 border-white"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={22} />
                    </button>
                </div>
                <button
                    type="submit"
                    className="border border-white w-12 h-12 p-2 rounded-lg flex items-center justify-center"
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    );
};
export default MessageInput;