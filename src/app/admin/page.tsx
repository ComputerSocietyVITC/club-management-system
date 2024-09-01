"use client";

import GeneralModal from "@/components/modals/generalmodal";

const titleClass = "text-6xl text-center col-span-3 font-medium";
const AdminPage = () => {
  return (
    <>
      <section className="flex-row justify-center text-white">
        <section className="bg-[#000000] grid grid-cols-3 min-h-[calc(100vw-55vw)] mx-12 p-4 grid-flow-row gap-4 border items-center border-t-white/[0.2] border-b-white/[0.5] border-l-white/[0.2] border-r-white/[0.2] bg-opacity-25 rounded-3xl my-36">
          <section className={titleClass}> TOOLS </section>
          <GeneralModal
            content="Milestone Manager"
            isButton={true} // Add achievements to members
            className="text-3xl"
            redirectTo="/tools/milestoneManager"
          />
          <GeneralModal
            content="Forms" //Form creation and viewing responses
            isButton={true}
            className="text-3xl"
            redirectTo="/tools/forms"
          />
          <GeneralModal
            content="FFCS"
            isButton={true} // FFCS status, grading, bulk import of ffcs members
            className="text-3xl  "
            redirectTo="/tools/ffcs"
          />
          <GeneralModal
            content="Assign Tasks"
            isButton={true} //random tasks, projects, events, etc
            className="text-3xl "
            redirectTo="/tools/assignTasks"
          />
          <GeneralModal
            content="Mailing System"
            isButton={true}
            className="text-3xl " //To club members, Newsletter, Custom Mailing - Sponsorships and SWC or VIT
            redirectTo="/tools/mailingSystem"
          />

          <GeneralModal
            content="Event Manager"
            isButton={true}
            className="text-3xl " // Add events, view events, edit events, delete events
            redirectTo="/tools/eventManager"
          />
        </section>
        <section className="grid grid-cols-3 min-h-[calc(100vw-55vw)] mx-12 p-4 grid-flow-row gap-4 border items-center border-t-white/[0.2] border-b-white/[0.5] border-l-white/[0.2] border-r-white/[0.2] rounded-3xl bg-black bg-opacity-25 my-36">
          <section className={titleClass}>EVENTS</section>
          <GeneralModal
            content="Paradox 24'"
            isButton={true}
            className="text-3xl " // use API requests to get data and display
            redirectTo="/events/paradox24"
          />
        </section>
        <section className="grid grid-cols-3 min-h-[calc(100vw-55vw)] mx-12 p-4 grid-flow-row gap-4 border items-center border-t-white/[0.2] border-b-white/[0.5] border-l-white/[0.2] border-r-white/[0.2] rounded-3xl bg-black bg-opacity-25 my-36">
          <section className={titleClass}>PROJECTS</section>
          <GeneralModal
            content="Club Main Site"
            isButton={true} // use API requests to get data and display
            className="text-3xl "
            redirectTo="/projects/clubmainsite"
          />
          <GeneralModal
            content="Club Management Site"
            isButton={true}
            className="text-3xl"
            redirectTo="/projects/clubmanagementsite"
          />
        </section>
      </section>
    </>
  );
};

export default AdminPage;
