"use client";

import GeneralModal from "@/components/modals/generalmodal";
import { useEffect, useState } from "react";

const titleClass = "text-6xl text-center col-span-2 font-medium";

export default function Home() {
  const [data, setData] = useState({ name: "" });

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <>
      <section className="min-h-screen text-white">
        <section className=" text-[7em] mt-48 px-72 text-center">
          <section className="text-left">Welcome! </section>
          <section className="text-right">{data.name}</section>
        </section>
        <section className="grid grid-cols-4 min-h-[calc(100vw-55vw)] mx-12 p-4 grid-flow-row gap-4 border items-center border-t-white/[0.2] border-b-white/[0.5] border-l-white/[0.2] border-r-white/[0.2] rounded-3xl bg-black bg-opacity-25 my-32">
          <section className={titleClass}>YOUR TASKS</section>
          <GeneralModal
            content="Club Main Site"
            isButton={true}
            className="text-3xl "
            redirectTo="/projects/clubmainsite"
          />
          <GeneralModal
            content="Club Management Site"
            isButton={true}
            className="text-3xl"
            redirectTo="/projects/clubmanagementsite"
          />
          {/* use API requests to get data and display
              make a new modal
              modal should contain the Project title, deadline, POCs
              on clicking the modal, further info about pending sub-tasks 
              and completed sub-tasks should be shown, title, description, 
              who is assigned for which sub-task,
              a tick box to say if that given task is completed or not
              
              if the task is completed by that member, either one of the POCs 
              can review it and confirm it. Upon confirmation, the member would 
              recieve a milestone or achievement unlocked kinda thing.
              all of the members' contribution will be shown in their profile*/}
        </section>
      </section>
    </>
  );
}
