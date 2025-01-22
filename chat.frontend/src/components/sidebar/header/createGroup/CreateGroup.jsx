import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function CreateGroup({ setShowCreateGroup }) {

  const [form, setForm] = useState({
    groupName: "",
    userName: "",
    email: "",
  });

  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);  // Add loading state
  const { user } = useSelector(state => state.user);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    // Prepare the body object to be sent in the request
    const body = { ...form };
    try {
      // Make the POST request to the API
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/customer/create-link`,
        body,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Handle any error returned in the response
      if (response.data.error) {
        alert(response.data.error.message);
        setLoading(false); // Set loading to false if there was an error
        return;
      }
      // Successfully received response, handle it here
      alert("Link created successfully!");
      setLink(`http://localhost:3000/c/${response.data.shortId}`);

      setLoading(false); // Set loading to false once the link is set
      console.log(response.data);  // If you need to check the response data
    } catch (error) {
      // Catch any error that occurred during the request
      console.error("Error while creating the link:", error);
      alert("An error occurred while creating the link.");
      setLoading(false); // Set loading to false if there was an error
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function setVisibility() {
    setShowCreateGroup(false);
  }

  return (
    <div className="createGroupAnimation relative flex0030 h-full z-40 bg-[white]">
      {/* Container */}
      <div className="mt-5">
        {/* Return/Close button */}
        <h3 className="bg-[darkgreen] px-5 py-5 text-white">
          Create a New Conversation Link for Customer.
        </h3>
        <form className="mt-3 px-3 w-full flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full justify-between items-center mb-3">
            <div className="w-full">
              <label htmlFor="group-name" className="block">Group Name</label>
              <input
                type="text"
                id="group-name"
                className="p-3 border w-full mt-1"
                placeholder="Enter Group Name"
                name="groupName"
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full mt-3">
              <label htmlFor="username" className="block">Enter Username</label>
              <input
                type="text"
                id="username"
                name="userName"
                className="p-3 border w-full mt-1"
                placeholder="Enter Username"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-between items-center mb-3 w-full">
            <div className="w-full">
              <label htmlFor="email" className="block">Enter Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="p-3 border w-full mt-1"
                placeholder="Enter Email"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Show link when available */}
          {link && (
            <div className="mt-4">
              <p>Generated Link:</p>
              <div className="text-blue-500">
                {link}
              </div>
            </div>
          )}

          {/* Show loading indicator */}
          {loading && (
            <div className="flex justify-center mt-3">
              <div className="loader"></div> {/* You can create or use a CSS spinner here */}
            </div>
          )}

          <button
            className="border-2 px-4 py-2 border-cyan-400 w-full mt-4"
            type="submit"
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Creating..." : "Submit"}
          </button>
        </form>

        <br />
        <div className="flex justify-end px-4">
          <button type="button" className="underline text-blue-500" onClick={() => setVisibility()}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
