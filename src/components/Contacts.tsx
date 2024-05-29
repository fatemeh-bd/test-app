"use client";

import {
  addUserHandler,
  fetchcurrentChat,
  newUserFromHandler,
} from "@/redux/chatReducer/chatActions";
import React, { Key, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserProfile from "./UserProfile";
import Image from "next/image";
import { IMsgDataTypes } from "./ChatContent";

const Contacts = ({ showSpinner, setShowSpinner, socket }: any) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { username, roomId, userList } = useSelector(
    (state: any) => state.chatState
  );
  const handleJoin = (e: any) => {
    e.preventDefault();
    if (username !== "" && roomId !== "") {
      socket.emit("join_room", roomId);
      dispatch(addUserHandler({ username, roomId }));
      setShowSpinner(true);
      setTimeout(() => {
        setShowPopup(false);
        setShowSpinner(false);
      }, 500);
    } else {
      alert("Please fill in username and Room Id");
    }
  };
  const changeChat = (data:IMsgDataTypes) => {
    socket.emit("join_room", data.roomId);
    dispatch(fetchcurrentChat(data));
  };

  return (
    <div className="bg-sky-300 h-full w-[30%] p-4">
      {!userList?.length && (
        <Image
          width={200}
          className="mb-2 w-full"
          height={100}
          src="/notfoundUsers.jpg"
          alt="image"
        />
      )}
      {userList.map((item: any, i: Key) => (
        <li
          key={i}
          onClick={() => changeChat(item)}
          className="flex justify-between my-2 gap-x-6 p-5 bg-white  rounded-lg"
        >
          
          <div className="flex min-w-0 gap-x-4">
            <UserProfile text={item.username} />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {item.username}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                id:{item.roomId}
              
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="mt-1 text-xs leading-5 text-gray-500">1403/4/5</p>
          </div>
        </li>
      ))}

      <button
        className="bg-rose-500 text-white rounded-lg w-full p-3 text-center"
        onClick={() => setShowPopup(true)}
      >
        add user +
      </button>
      {showPopup && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <svg
                    onClick={() => setShowPopup(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 cursor-pointer text-sky-600 mb-3 ml-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>

                  <form
                    onSubmit={(e) => handleJoin(e)}
                    className="space-y-4"
                    action="#"
                    method="POST"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Your Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          name="username"
                          type="text"
                          autoComplete="name"
                          required
                          onChange={(e) =>
                            dispatch(
                              newUserFromHandler({
                                name: e.target.name,
                                value: e.target.value,
                              })
                            )
                          }
                          className="block w-full rounded-md p-3 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="roomId"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          roomId
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          id="roomId"
                          name="roomId"
                          type="text"
                          autoComplete="current-roomId"
                          required
                          onChange={(e) =>
                            dispatch(
                              newUserFromHandler({
                                name: e.target.name,
                                value: e.target.value,
                              })
                            )
                          }
                          className="block w-full rounded-md p-3 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {!showSpinner ? (
                          "Join"
                        ) : (
                          <div className={"loading_spinner"}></div>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
