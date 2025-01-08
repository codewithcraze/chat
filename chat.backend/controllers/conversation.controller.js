import createHttpError from "http-errors";
import logger from "../configs/logger.js";
import { findUser } from "../services/user.service.js";
import { doesConversationExist, createConversation, getUserConversations} from "../services/conversation.service.js";


export const createOpenConversation = async(req, res, next) => {
    try{
        const senderId = req.user.userId;
        const { receiverId } = req.body;

        if(!receiverId){
            logger.error('Please provide receiverId');
            throw createHttpError.BadRequest('Please provide receiverId');
        }
        const existedConversation = await doesConversationExist(senderId, receiverId);
        if(existedConversation){
            return res.json(existedConversation);
        }else{
            let receiverUser  = await findUser(receiverId);
            let convoData = {
                name: receiverUser.name,
                isGroup: false,
                users: [senderId, receiverId],
            }
            const newConversation = await createConversation(convoData);
            return res.json(newConversation);
        }
    }catch(error){
        next(error);
    }
}


export const getConversations = async(req, res, next) => {
    try{
        const userId = req.user.userId;
        const conversations = await getUserConversations(userId);
        res.status(200).json(conversations);
    }catch(error){
        next(error);
    }
}