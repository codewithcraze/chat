import { useSelector } from "react-redux";
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "../../../svg";

export default function SidebarHeader() {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {/*Sidebar header*/}
      <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p16">
        {/* container */}
        <div className="w-full flex items-center justify-between">
          {/*user image*/}
          <button className="btn">
            <img
              src={user.picture}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          {/*user name*/}
          <h4 className="dark:text-dark_text_1">{user.name}</h4>
          {/*user icons*/}
          {/* <ul className="flex items-center gap-x-2 5">
            <li >
              <button className="flex justify-center items-center">
                <CommunityIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li>
              <button className="flex justify-center items-center">
                <StoryIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li>
              <button className="flex justify-center items-center">
                <ChatIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
          </ul> */}
        </div>
      </div>
      {/*Create Group*/}
   
    </>
  );
}
