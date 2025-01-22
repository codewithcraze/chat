import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getConversationMessages } from "../../features/chatSlice";
import {ChatActionsClient} from "./actions";
import ChatMessages from "./messages/ChatMessages";

export default function ChatContainer({ onlineUsers, typing, token, convo_id }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const values = {
      token,
      convo_id: convo_id,
    };
    if (convo_id) {
      dispatch(getConversationMessages(values)); // Fetch messages when convo_id is available
    }
  }, [dispatch, convo_id, token]);

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      {/*Container*/}
      <div>
        <ChatMessages typing={typing} />
        <ChatActionsClient token={token} convo_id={convo_id} />
      </div>
    </div>
  );
}
