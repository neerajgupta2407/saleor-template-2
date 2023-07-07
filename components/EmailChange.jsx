import React, { useState } from "react";

const EmailChange = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSave = () => {
    // Perform save logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px 10px 10px 10px",
        marginBottom: "10px",
        width: "800px",
      }}
    >
      <h2 className="text-xl font-semibold">Change Email</h2>
      <div className="form-wrapper mt-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            style={{
                height: "30px",
                padding: "10px",
                borderRadius: "4px",
                width: "100%",
                border: "1px solid rgba(0, 0, 0, 1)",
                marginTop: "5px"
              }}
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password:
          </label>
          <input
            style={{
              height: "30px",
              padding: "10px",
              borderRadius: "4px",
              width: "100%",
              border: "1px solid rgba(0, 0, 0, 1)",
              marginTop: "5px"
            }}
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          style={{
            border: "none",
          }}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EmailChange;
