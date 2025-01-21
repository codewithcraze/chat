import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessages } from "../../features/chatSlice";
import { checkOnlineStatus, getConversationId } from "../../utils/chat";
import { ChatActionsClient } from "./actions";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import FilesPreview from "./preview/files/FilesPreview";

export default function ChatContainer({ onlineUsers, typing }) {
    const dispatch = useDispatch();
    let activeConversation = {};
    const { files } = useSelector((state) => state.chat);
    activeConversation._id = "678e6576869d2b2da587350e";
    const { user } = useSelector((state) => state.user);
    const { token } = user;
    const values = {
        token,
        convo_id: activeConversation?._id,
    };
    useEffect(() => {
        if (activeConversation?._id) {
            dispatch(getConversationMessages(values));
        }
    }, []);
    return (
        <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden ">
            {/*Container*/}
            <div>
                <ChatMessages typing={typing} />
                <ChatActionsClient />
            </div>
        </div>
    );
}
