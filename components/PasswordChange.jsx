import { usePasswordChangeMutation } from "@/saleor/api";
import React, { useState } from "react";

const PasswordChange = () => {
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [notification, setNotification] = useState("");

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleRepeatNewPasswordChange = (e) => {
    setRepeatNewPassword(e.target.value);
  };

  const [passwordChange, { loading, error }] = usePasswordChangeMutation();

  const handleSave = async () => {
    if (newPassword !== repeatNewPassword) {
      console.log("New passwords don't match");
      return;
    }

    const { data, loading, error } = await passwordChange({
      variables: {
        newPassword: newPassword,
        oldPassword: oldPassword,
      },
      context: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
      },
    });

    if (data) {
      setNotification("Password changed successfully.");
    }
    if (error) {
      setNotification(`${error}`);
    }

    console.log(notification);

    console.log(data);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
      className="component-wrapper"
    >
      <h2 className="text-xl font-semibold">Change Password</h2>
      {notification && <p className="text-green-500">{notification}</p>}
      <div className="form-wrapper mt-4">
        <div className="mb-4">
          <label
            htmlFor="oldPassword"
            className="block text-gray-700 font-medium"
          >
            Old Password:
          </label>
          <input
            style={{
              height: "30px",
              padding: "10px",
              borderRadius: "4px",
              width: "100%",
              border: "1px solid rgba(0, 0, 0, 1)",
              marginTop: "5px",
            }}
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-gray-700 font-medium"
          >
            New Password:
          </label>
          <input
            style={{
              height: "30px",
              padding: "10px",
              borderRadius: "4px",
              width: "100%",
              border: "1px solid rgba(0, 0, 0, 1)",
              marginTop: "5px",
            }}
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="repeatNewPassword"
            className="block text-gray-700 font-medium"
          >
            Repeat New Password:
          </label>
          <input
            style={{
              height: "30px",
              padding: "10px",
              borderRadius: "4px",
              width: "100%",
              border: "1px solid rgba(0, 0, 0, 1)",
              marginTop: "5px",
            }}
            type="password"
            id="repeatNewPassword"
            value={repeatNewPassword}
            onChange={handleRepeatNewPasswordChange}
          />
        </div>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          style={{
            border: "none",
          }}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PasswordChange;
