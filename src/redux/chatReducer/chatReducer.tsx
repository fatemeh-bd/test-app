interface User {
  username: string;
  roomId: string;
  chat: ChatMessage[];
}

interface ChatMessage {
  // Define the properties of a chat message
}

interface CurrentChat {
  roomId: string;
  username: string;
  chat: ChatMessage[];
}

interface AppState {
  userList: User[];
  username: string;
  roomId: string;
  currentChat: CurrentChat;
}

const initializedState: AppState = {
  userList: [],
  username: "",
  roomId: "",
  currentChat: {
    roomId: "",
    username: "",
    chat: [],
  },
};

const chatReducer = (state: AppState = initializedState, action: any) => {
  switch (action.type) {
 

    case "ADD_USER":
      const { username, roomId } = action.payload;
      
      return {
        ...state,
        userList: [...state.userList, { username, roomId, chat: [] }],
      };

    case "NEW_USER_FORM_HANDLER": {
      const { name, value } = action;
      return {
        ...state,
        [name]: value,
      };
    }

    case "FETCH_CURRENT_CHAT": {
      return {
        ...state,
        currentChat: action.payload,
      };
    }

    case "ADD_MESSAGE": {
      const findIndex = state.userList.findIndex(
        (user) => user.roomId === action.payload.roomId
      );
      if (findIndex === -1) {
        return state; // Handle error, room not found
      }

      const updatedUserList = [...state.userList];
      updatedUserList[findIndex] = {
        ...updatedUserList[findIndex],
        chat: [...updatedUserList[findIndex].chat, action.payload],
      };
    
      return {
        ...state,
        userList: updatedUserList,
        currentChat: {
          ...state.currentChat,
          chat: [...state.currentChat.chat, action.payload],
        },
      };
    }

    default:
      return state;
  }
};

export default chatReducer;
