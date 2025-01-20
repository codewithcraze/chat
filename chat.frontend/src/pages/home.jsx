import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../components/sidebar";
import Header from "../components/header";

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  
  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        <Header />
        {/*container*/}
        <div className="container h-screen flex py-[19px] mt-28">
          {/*Sidebar*/}
          <Sidebar />
    
        </div>
      </div>
      {/*Call*/}

     
    </>
  );
}


export default Home;
