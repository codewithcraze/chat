import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatContainerClient } from "../components/Chat";
import SocketContext from "../context/SocketContext";
import {
  getConversations,
  updateMessagesForClient,
} from "../features/chatSlice";

function ClientHome({ socket }) {
  const dispatch = useDispatch();
  console.log(socket);
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  //join user into the socket io
  useEffect(() => {
    socket.emit("join", user._id);
  }, [user]);

  //get Conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [dispatch, user]);


  useEffect(() => {
    //lsitening to receiving a message
    socket.on("receive message", (message) => {
      dispatch(updateMessagesForClient(message));
    });
    //listening when a user is typing
    socket.on("typing", (conversation) => setTyping(conversation));
    socket.on("stop typing", () => setTyping(false));
  }, []);


  return (
    <>
    {/* Header */}
    
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        {/*container*/}
        <div className="w-[1000px] h-screen flex py-[19px]">
          <ChatContainerClient
            onlineUsers={onlineUsers}
            typing={typing}
          />
        </div>
      </div>
    </>
  );
}

const HomeClientWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ClientHome {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeClientWithSocket;
