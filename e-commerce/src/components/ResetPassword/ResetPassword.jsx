import { useState, useParams } from "react";
import { hostName } from "../../ulits/GlobalHostName";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { token } = useParams();

  const handleResetPassword = async () => {
    setError("");
    setSuccess("");

    // Perform validation
    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Send reset password request to the server
    try {
      const response = await fetch(
        `http:${hostName}:3000/user/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, token }),
        }
      );

      if (response.ok) {
        setSuccess("Password reset successfully.");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">New Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-input w-full"
        />
      </div>
      <div className="mb-4">
        <button
          onClick={handleResetPassword}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Reset Password
        </button>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">{success}</div>}
    </div>
  );
};

export default ResetPassword;
