import { ConversationModel, MessageModel } from '../models/index.js';
import createHttpError from 'http-errors';

export const createMessage = async (data) => {
    let newMessage = await MessageModel.create(data);
    if (!newMessage) {
        throw createHttpError.BadRequest("Oops... Something went wrong!");
    }

    return newMessage;
}

export const populateMessage = async (id) => {
    let message = await MessageModel.findById(id)
        .populate({
            path: "sender",
            select: "name email picture status",
            model: "UserModel"
        })
        .populate({
            path: "conversation",
            select: "name isGroup users",
            populate: {
                path: "users",
                select: "name email picture status",
                model: "UserModel"
            }
        })
    if (!message) {
        throw createHttpError.BadRequest("Oops... Something went wrong!");
    }
    return message;
}

export const updateLatestMessage = async(convo_Id, msg) => {
    const updatedConvo = await ConversationModel.findByIdAndUpdate(convo_Id, {latestMessage: msg});

    if(!updatedConvo){
        throw createHttpError.BadRequest("Oops... Something went wrong!");
    }
    return updatedConvo;
}


export const getConvoMessage = async(convo_id) => {
    const messages = await MessageModel.find({
        conversation: convo_id
    }).populate("sender", "name email picture status").populate("conversation");
    if(!messages){
        throw createHttpError.BadRequest("Oops... Something went wrong!");
    }

    return messages;
}