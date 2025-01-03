import createHttpError from "http-errors";
import logger from "../configs/logger.js";
import { findUser } from "../services/user.service.js";

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
            res.json(existedConversation);
        }else{
            let receiverUser  = await findUser(receiverId);
            let convoData = {
                name: receiverUser,
                isGroup: false,
                users: [senderId, receiverId],
            }
            const newConversation = await createOpenConversation(convoData);


        }
        res.json({
            senderId,
            receiverId
        })
    }catch(error){
        next(error);
    }
}