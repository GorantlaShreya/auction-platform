import React from "react";

const SignIn1 = () => {
  return (
    <div className="center-container">
      <h1>Sign In</h1>
      <form>
        <input type="text" placeholder="Username" required /><br />
        <input type="password" placeholder="Password" required /><br />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn1;
