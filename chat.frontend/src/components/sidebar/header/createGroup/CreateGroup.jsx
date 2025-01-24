import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { countries } from "./countries"; // Assuming the countries array is imported from another file

export default function CreateGroup({ setShowCreateGroup }) {
  const [form, setForm] = useState({
    groupName: "",
    userName: "",
    email: "",
    countryCode: "", // To store the selected country's phone code
  });
  const [check, setCheck] = useState(false); // To track the checkbox state
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  // Handle checkbox change
  function handleCheckboxChange(e) {
    setCheck(e.target.checked); // Update the checkbox state
  }

  // Handle country selection change
  function handleCountryChange(e) {
    setForm({ ...form, countryCode: e.target.value }); // Update the selected country code in the form state
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const body = { ...form, sendViaEmail: check }; // Include checkbox state in the request body
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
        setLoading(false);
        return;
      }

      // Successfully received response, handle it here
      alert("Link created successfully and Working on Sending Link Via Phone Number and Email.!");
      setLink(`http://localhost:3000/c/${response.data.shortId}`);


      // Now Implment Feature like Sending Via Email or PhoneNumber.

    } catch (error) {
      // Catch any error that occurred during the request
      console.error("Error while creating the link:", error);
      alert("An error occurred while creating the link.");
      setLoading(false);
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
      <div className="mt-5">
        <h3 className="bg-[darkgreen] text-xl px-5 py-5 text-white">
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
              <label htmlFor="group-name" className="block">Enter Username</label>
              <input
                type="text"
                id="group-name"
                className="p-3 border w-full mt-1"
                placeholder="Enter User Name"
                name="userName"
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full mt-3">
              <label htmlFor="phoneNumber" className="block">Enter Phone Number</label>
              <div className="flex items-center space-x-2">
                <select
                  name="countryCode"
                  onChange={handleCountryChange}
                  className="p-3 border w-32"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.phone}>
                      {country.label} +{country.phone}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="p-3 border w-full mt-1"
                  placeholder="Enter Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
              

          <div className="flex justify-between items-center mb-3 w-full">
            <div className="w-full">
              <label htmlFor="email" className="block">Enter User Email Address.</label>
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
              <div className="text-blue-500">{link}</div>
            </div>
          )}

          {/* Show loading indicator */}
          {loading && (
            <div className="flex justify-center mt-3">
              <div className="loader">Generating Link</div>
            </div>
          )}

          {/* Checkbox for sending via email */}
          <div className="flex items-center space-x-2">
            <input
              id="sendLinkCheckbox"
              type="checkbox"
              name="checkbox"
              className="h-10 w-10 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition duration-200 ease-in-out"
              checked={check}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="sendLinkCheckbox" className="text-gray-700 text-sm">
              If you want to send the link via email, check this box; otherwise, it will be sent via Phone Number.
            </label>
          </div>

          <button
            className="border-2 px-4 py-2 border-cyan-400 w-full mt-4"
            type="submit"
            disabled={loading}
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
