import { createUser } from "../services/auth.service.js";
import { generateToken } from "../services/token.service.js";
import shortid from 'shortid';
import { doesConversationExist, createConversation, getUserConversations} from "../services/conversation.service.js";
import createHttpError from "http-errors";
import { findUser } from "../services/user.service.js";
import logger from "../configs/logger.js";
import { saveShortURL , findShortURL} from "../services/short.service.js";


export const createLink = async (req, res, next) => {
    try {
        const { groupName, userName, email } = req.body;
        const password = "Deepak@123";
        const newUser = await createUser({
            name: userName,
            email,
            password,
        });
        const access_token = await generateToken(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_AGE,
            process.env.ACCESS_TOKEN_SECRET
        );
        const refresh_token = await generateToken(
            { userId: newUser._id },
            process.env.REFRESH_TOKEN_AGE,
            process.env.REFRESH_TOKEN_SECRET
        );
        const senderId = req.user.userId;
        const receiverId  = newUser._id;

        if(!newUser._id){
            logger.error('Please provide receiverId');
            throw createHttpError.BadRequest('Please provide receiverId');
        }
        const existedConversation = await doesConversationExist(senderId, receiverId);
        if(existedConversation){
            // Short the url.
            const data = {
                access_token,
                refresh_token,
                groupName,
                conversationId: existedConversation._id,
                userId: newUser._id
            }
            const shortURL = await shortTheURL(data);
            res.json({
                shortId: shortURL.shortId
            })
        }else{
            let receiverUser  = await findUser(receiverId);
            let convoData = {
                name: receiverUser.name,
                isGroup: false,
                users: [senderId, receiverId],
            }
            const newConversation = await createConversation(convoData);
            const data = {
                access_token,
                refresh_token,
                groupName,
                conversationId: newConversation._id,
                userId: newUser._id
            };
            const shortURL = await shortTheURL(data);
            res.json({
                shortId: shortURL.shortId
            })
        }
    } catch (error) {
        next(error);
    }
}

export const navigateToLink  = async (req, res, next) => {
    const shortId = req.body.shortId;
    const shortURL = await findShortURL(shortId);
    if(!shortURL){
        logger.error('Short URL not found');
        throw createHttpError.NotFound('Short URL not found');
    }
    res.json({
        url: shortURL.originalURL
    })
}

async function shortTheURL({access_token, refresh_token, groupName, conversationId, userId}){
    const url = `https://localhost:3000/chat?token=${access_token}&roomId=${conversationId}&userId=${userId}`;
    const urlCode = shortid.generate();
    const shortURL = await saveShortURL(url, urlCode);
    return shortURL;
}