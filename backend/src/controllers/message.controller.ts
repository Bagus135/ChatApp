import { Response, Request} from "express";
import prisma from "../db/prismaDB.js";
import { getReceiverSocketID, io } from "../socket/socket.js";

export const sendMessage = async (req : Request, res : Response) =>{
    try {
        const {message} = req.body;
        const {id : receiverID} = req.params;
        const senderID = req.user.id;

        let conversation = await prisma.conversation.findFirst({
            where : {
                participansID : {
                    hasEvery : [senderID, receiverID]
                }
            }
        })

        if(!conversation){
            conversation = await prisma.conversation.create({
                data : {
                    participansID : {
                        set : [senderID, receiverID]
                    }
                }
            })
        }

        const newMessage = await prisma.messages.create({
            data : {
                senderID,
                body : message,
                conversationID : conversation.id,
            }
        })

        if(newMessage){
            conversation = await prisma.conversation.update({
                where : {
                    id : conversation.id
                },
                data : {
                    messages : {
                        connect : {
                            id : newMessage.id
                        }
                    }
                }
            })
        }
        const receiveSocketID = getReceiverSocketID(receiverID);
        if(receiveSocketID){
            io.to(receiveSocketID).emit('newMessage', newMessage)
        }
        res.status(201).json(newMessage)
    } catch(err:any) {
        console.log("Error in SendMessage Controller", err.message);
        res.status(500).json({error: "Internal Server Erorr"})
    }
}

export const getMessage = async (req:Request, res : Response) => {
    try {
        const {id:userToChatId} = req.params;
        const senderID = req.user.id;

        const conversation = await prisma.conversation.findFirst({
            where : {
                participansID: {
                    hasEvery : [senderID, userToChatId]
                }
            },
            include :{
                messages : {
                    orderBy : {
                        createdAt : "asc"
                    }
                }
            }
        })

        if (!conversation) {
           return res.status(200).json([])
        }

        res.status(200).json(conversation.messages)
    } catch (error: any) {
        console.log("Error in SendMessage Controller", error.message);
        res.status(500).json({error: "Internal Server Erorr"})
        
    }
    
}

export const getSideBar = async (req:Request, res:Response) => {
    try{const authUserID = req.user.id;
    
    const users = await prisma.user.findMany({
        where : {
            id : {
                not : authUserID
            }
        }, 
        select : {
            id: true,
            fullname : true,
            profilePic : true,
        }
    });
    if (!users){
        res.status(200).json([])
    }
    res.status(200).json(users)
    } catch (error:any){
        console.log("Error in getSideBar Controller", error.message);
        res.status(500).json({error : "Internal Server Error"});
    }
}