import { useState } from "react";

export default function CreateGroup({ setShowCreateGroup }) {

  const [form, setForm] = useState({
    groupName: "",
    userName: "",
    email: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    // Steps To Implement
  }

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value });
  }

    console.log(form);

  function setVisibility() {
    setShowCreateGroup(false);
  }
  return (
    <div className="createGroupAnimation relative flex0030 h-full z-40 bg-[white]">
      {/*Container*/}
      <div className="mt-5">
        {/*Return/Close button*/}
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
              />
            </div>
          </div>

          <button
            className="border-2 px-4 py-2 border-cyan-400 w-full mt-4"
            type="submit"
          >
            Submit
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
