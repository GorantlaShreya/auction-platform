import React from "react";

const SignUp1 = () => {
  return (
    <div className="center-container">
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder="Full Name" required /><br />
        <input type="email" placeholder="Email" required /><br />
        <input type="password" placeholder="Password" required /><br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp1;
