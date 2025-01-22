import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatContainerClient } from "../components/Chat";
import SocketContext from "../context/SocketContext";
import { useLocation } from "react-router-dom";
import { setCustomerToken } from '../features/userSlice';
import {
  getConversations,
  updateMessagesForClient,
} from "../features/chatSlice";

function ClientHome({ socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  const [token, setToken] = useState("");
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState(""); // To store userId from URL

  const location = useLocation(); // To get the current location (URL)

  // Extract token, roomId, and userId from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const roomId = params.get("roomId");
    const userId = params.get("userId");

    if (token && roomId && userId) {
      setToken(token);
      setRoomId(roomId);
      setUserId(userId); // Set userId as well
      dispatch(setCustomerToken({ token, userId })); // Set token and userId in Redux
    } else {
      console.error("Token, RoomId, or UserId is missing in the URL");
    }
  }, [location.search, dispatch]); // Re-run the effect if the URL changes

  // Join the user into the socket room
  useEffect(() => {
    if (user && user._id) {
      socket.emit("join", user._id); // Join socket room with user ID
    }
  }, [user, socket]);

  // Get conversations when the token changes
  useEffect(() => {
    if (token) {
      dispatch(getConversations(token));
    }
  }, [token, dispatch]);

  // Set up socket listeners for messages and typing events
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
        {/* container */}
        <div className="w-[1000px] h-screen flex py-[19px]">
          <ChatContainerClient
            onlineUsers={onlineUsers}
            typing={typing}
            token={token}
            convo_id={roomId}
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
