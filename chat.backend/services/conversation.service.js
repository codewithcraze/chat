import createHttpError from "http-errors";
import { ConversationModel, UserModel } from "../models/index.js";

/**
 * Check if a conversation exists between two users.
 * @param {String} senderId - The ID of the sender.
 * @param {String} receiverId - The ID of the receiver.
 * @returns {Object|null} - The existing conversation or null.
 */
export const doesConversationExist = async (senderId, receiverId) => {
    try {
        // Find a non-group conversation between sender and receiver
        let convo = await ConversationModel.findOne({
            isGroup: false,
            $and: [
                { users: { $elemMatch: { $eq: senderId } } },
                { users: { $elemMatch: { $eq: receiverId } } }
            ]
        })
            .populate("users", "-password") // Exclude the password field
            .populate("latestMessage");

        if (!convo) {
            return null; // Return null if no conversation exists
        }

        // Populate the sender of the latest message
        convo = await UserModel.populate(convo, {
            path: "latestMessage.sender",
            select: "name email picture status"
        });

        return convo; // Return the conversation object
    } catch (error) {
        throw createHttpError.InternalServerError("Error checking conversation existence.");
    }
};

/**
 * Create a new conversation.
 * @param {Object} data - The data for creating the conversation.
 * @returns {Object} - The newly created conversation.
 */
export const createConversation = async (data) => {
    try {
        // Create a new conversation
        const newConvo = await ConversationModel.create(data);

        if (!newConvo) {
            throw createHttpError.BadRequest("Failed to create the conversation. Please try again.");
        }

        return newConvo; // Return the created conversation
    } catch (error) {
        throw createHttpError.InternalServerError("Error creating a new conversation.");
    }
};


/**
 * Get all the conversations of a user.
 * @param {String} userId 
 */
export const getUserConversations = async (userId) => {
    let conversations;
    await ConversationModel.find({users: {
        $elemMatch: {$eq: userId}
    }}).populate("users", "-password")
    .populate("admin", '-password')
    .populate("latestMessage")
    .sort({updatedAt: -1})
    .then(async(results) => {
        results = await UserModel.populate(results, {
            path: "latestMessage.sender",
            select: "name email picture status"
        })
        conversations = results;
    }).catch((error) => {
        throw createHttpError.InternalServerError("Error getting user conversations.");
    })

    return conversations;
}