import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import  useConversation from "../../zustand/useConversation";
// import {extractTime} from "../../utils/extractTime";

const Message = ({message} : {message : MessagesType}) =>{
    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation();

    const fromMe = message?.senderID === authUser?.id; // check true false apakah user adalah dia sendiri
    const img = fromMe? authUser?.profilPic : selectedConversation?.profilePic // mengatur foto dirinya sendiri atau lawan bicara
    const chatClass = fromMe? "chat-end" : "chat-start"; // menentukan posisi chatting nya

    const bubbleBg = fromMe? "bg-blue-500" : ''; // menentukan pov user background chat
    // const shakeClass = message.shouldShake? 'shake' :'';

    return(
        <div className={`chat ${chatClass}`}>
            <div className="hidden md:block chat-image avatar">
                <div className="w-6 md:w-10 rounded-full">
                    <img alt= 'Profile Picture' src={img}/>
                </div>
            </div>
            <p className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}>
                {message.body}
            </p>
            <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
                {extractTime(message.createdAt)}
            </span>
        </div>
    )    
}

export default Message