import { IMsgDataTypes } from "@/components/ChatContent";

export const addUserHandler = (data: { username: string; roomId: string }) => {
  return {
    type: "ADD_USER",
    payload: data,
  };
};
export const newUserFromHandler = (data: { name: string; value: string }) => {
  return {
    type: "NEW_USER_FORM_HANDLER",
    name: data.name,
    value: data.value,
  };
};

export const fetchcurrentChat = (data:IMsgDataTypes) => {
  return {
    type: "FETCH_CURRENT_CHAT",
    payload: data,
  };
};

export const addMessageHandler = (data: IMsgDataTypes) => {
  return {
    type: "ADD_MESSAGE",
    payload: data,
  };
};


