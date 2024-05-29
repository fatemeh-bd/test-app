"use client";
import Contacts from "@/components/Contacts";
import React, { useState } from "react";
import { chatStore } from "@/redux/store";
import { Provider } from "react-redux";
import ChatContent from "@/components/ChatContent";
import { io } from "socket.io-client";

const page = () => {
  let socket = io("http://localhost:3001");
  const [showSpinner, setShowSpinner] = useState(false);

  return (
    <Provider store={chatStore}>
      <div className="h-[100vh] flex ">
        <Contacts
          showSpinner={showSpinner}
          setShowSpinner={setShowSpinner}
          socket={socket}
        />
        <ChatContent socket={socket}  />
      </div>
    </Provider>
  );
};

export default page;
