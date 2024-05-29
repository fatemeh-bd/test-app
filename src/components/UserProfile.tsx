import React from "react";

const UserProfile = ({ text }: { text: string }) => {
  return (
    <div className="size-10 bg-sky-100 flex items-center text-sky-600 justify-center rounded-full">
      {text.charAt(0)}
    </div>
  );
};

export default UserProfile;
