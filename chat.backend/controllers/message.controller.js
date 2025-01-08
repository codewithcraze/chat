export const sendMessage = async (req, res, next) => {
    try{
        res.json({
            message: "Message sent successfully"
        })
    }catch(error){
        next(error);
    }
}


export const getMessages = async (req, res, next) => {
    try{

    }catch(error){
        next(error);
    }
}