import logger from '../configs/logger.js'
import { createMessage, populateMessage, updateLatestMessage , getConvoMessage} from '../services/message.service.js';



export const sendMessage = async (req, res, next) => {
    try{
        const user_id = req?.user?.userId;
        if(!user_id){
            return res.sendStatus(400)
        }
        const { message, convo_id, files} = req.body;
        if(!convo_id || (!message && !files)){
            logger.error("Invalid data passed into the request. Please Provide Conversation Id and message body");
            return res.sendStatus(400)
        }
        const messageData = {
            sender: user_id,
            message,
            conversation: convo_id,
            files: files || [],
        }
        let newMessage = await createMessage(messageData);
        let populatedMessage = await populateMessage(newMessage._id);
        await updateLatestMessage(convo_id, newMessage);
        res.json(populatedMessage);
    }catch(error){
        next(error);
    }
}


export const getMessages = async (req, res, next) => {
    try{
        const convo_id = req.params.convo_id;
        if(!convo_id){
            logger.error("Invalid conversation id provided");
            return res.sendStatus(400)
        }
        const messages = await getConvoMessage(convo_id);
        res.json(messages);
    }catch(error){
        next(error);
    }
}   