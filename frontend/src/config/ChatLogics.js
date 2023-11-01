// export const getSender = (LoggedUser, users) => {
//     return users[0]._id === LoggedUser._id ? users[1].name : users[0].name;

// }

export const getSender = (LoggedUser, users) => {
    if (!LoggedUser || !users || users.length !== 2) {
        // Handle invalid data or edge cases
        return "Unknown Sender";
    }

    if (users[0]._id === LoggedUser._id) {
        return users[1].name;
    } else {
        return users[0].name;
    }
}

export const getSenderFull = (LoggedUser, users) => {
    if (!LoggedUser || !users || users.length !== 2) {
        // Handle invalid data or edge cases
        return "Unknown Sender";
    }

    if (users[0]._id === LoggedUser._id) {
        return users[1];
    } else {
        return users[0];
    }
}


export const isSameSender =(message,m,i,userId)=>{
    return(
        i<message.length-1 && (message[i+1].sender._id!==m.sender._id||message[i+1].sender._id===undefined)&&message[i].sender._id!==userId
    );
};

export const isLastMessage=(message,i,userId)=>{
    return(
        i===message.length-1 && 
        message[message.length-1].sender._id!==userId && message[message.length-1].sender._id
    );
};

export const isSameSenderMargin =(message, m , i, userId)=>{
    if(
        i<message.length-1 && message[i+1].sender._id === m.sender._id && message[i].sender._id !==userId
    )return 45;
    else if(
        (i<message.length-1 && message[i+1].sender._id !== m.sender._id && message[i].sender._id !==userId)||(i===message.length-1 && message[i].sender._id !==userId)
    )
    return 0;
    else return "auto";
}

export const isSameUser =(message, m ,i)=>{
    return i>0 && message[i-1].sender._id === m.sender._id;
}