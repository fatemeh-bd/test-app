"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import { addMessageHandler } from "@/redux/chatReducer/chatActions";
import { useDispatch } from "react-redux";

export interface IMsgDataTypes {
  roomId?: String | number;
  user: String;
  msg: String;
}
const ChatContent = ({ socket }: any) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const { currentChat } = useSelector((state: any) => state.chatState);
  const dispatch = useDispatch();
  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const msgData: IMsgDataTypes = {
        roomId: currentChat.roomId,
        user: currentChat.username,
        msg: currentMsg,
      };
     
      await socket.emit("send_msg", msgData);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("receive_msg", (data: IMsgDataTypes) => {
      dispatch(addMessageHandler(data));
    });
  }, [socket]);
  return (
    <div className="w-[70%] h-full bg-gray-100 p-4 relative">
      {currentChat.roomId ? (
        <>
          <div className="bg-white p-4 rounded-xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <UserProfile text={currentChat.username} />
              <div>
              <p>{currentChat.username}</p>
              <p className={`${socket.connected?"text-green-500":"text-rose-500"} text-sm`}>{socket.connected?"online":"offline"}</p>
              </div>
            </div>
            <p>
              room id:{" "}
              <span className="text-sky-700">{currentChat.roomId}</span>
            </p>
          </div>

          <div className="h-[70vh] overflow-auto p-4">
            {currentChat.chat?.map(
              ({ user, msg }: { user: string; msg: string }, key: number) => (
                <div
                  key={key}
                  className={`${
                    user == currentChat.username ? "ml-auto" : "mr-auto"
                  } flex-wrap bg-white flex items-start rounded-lg p-2 my-2 w-fit max-w-[50%] anywhere`}
                >
                  {user !== currentChat.username && (
                    <div className="flex items-center gap-2">
                      <UserProfile text={`${user}`} />
                    </div>
                  )}

                  <p
                    style={{
                      textAlign:
                        user == currentChat.username ? "right" : "left",
                    }}
                  >
                    {msg}
                  </p>
                </div>
              )
            )}
          </div>
          <form
            onSubmit={(e) => sendData(e)}
            className="flex items-start bg-white p-4 absolute bottom-0 right-0 left-0"
          >
            <input
              type="text"
              placeholder="write message"
              value={currentMsg}
              className="bg-transparent w-full outline-none"
              onChange={(e) => setCurrentMsg(e.target.value)}
            />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 text-sky-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        </>
      ) : (
        <p className="text-xl text-sky-500 text-center mt-12">select room</p>
      )}
    </div>
  );
};

export default ChatContent;
