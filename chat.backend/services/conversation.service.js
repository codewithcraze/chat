import createHttpError from "http-errors";
import { ConversationModel } from "../models/index.js";

export const doesConversationExist = async(senderId, receiverId) => {
    let convo = await ConversationModel.find({
        isGroup: false,
        $and: [
            {users: {$elemMatch: {$eq: senderId}}},
            {users: {$elemMatch: {$eq: receiverId}}}
        ]
    }).populate("users", "-password").populate("latestMessage");

    if(!convo) throw createHttpError.BadGateway("Something went wrong. Please try again later.");

    // Populate message model.
    convo = await UserModel.populate(convo, {
        path: "latestMessage.sender",
        select: "name email picture status"
    })

    return convo[0];
}


export const createOpenConversation = async(data) => {
    const newConvo = await ConversationModel.create(data);
    if(!  )
}