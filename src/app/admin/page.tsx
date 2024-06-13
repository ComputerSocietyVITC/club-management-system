"use client";

import GeneralModal from "@/components/modals/generalmodal";

const AdminPage = () => {
  return (
    <>
      <section className="flex-row justify-center text-white">
        <section className="grid grid-cols-3 min-h-[calc(100vw-55vw)] mx-12 p-4 grid-flow-row gap-4 border items-center border-t-white/[0.2] border-b-white/[0.5] border-l-white/[0.2] border-r-white/[0.2] rounded-3xl bg-white bg-opacity-[5px] my-36">
          <section className="text-6xl text-center col-span-3"> TOOLS </section>
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
            redirectTo="/tools/asignTasks"
          />
          <GeneralModal
            content="Mailing System"
            isButton={true}
            className="text-3xl " //To club members, Newsletter, Custom Mailing - Sponsorships and SWC or VIT
            redirectTo="/tools/mailingSystem"
          />

          <GeneralModal
            content="Mailing System"
            isButton={true}
            className="text-3xl "
            redirectTo="/tools/mailingSystem"
          />
        </section>
        <section className="grid grid-cols-3 min-h-[calc(100vw-55vw)] mx-12 p-4 grid-flow-row gap-4 border items-center border-t-white/[0.2] border-b-white/[0.5] border-l-white/[0.2] border-r-white/[0.2] rounded-3xl bg-white bg-opacity-[5px] my-36">
          <section className="text-6xl text-center col-span-3">Events</section>
          <GeneralModal
            content="Paradox 24'"
            isButton={true}
            className="text-3xl " // use API requests to get data and display
            redirectTo="/events/paradox24"
          />
        </section>
        <section className="grid grid-cols-3 min-h-[calc(100vw-55vw)] mx-12 p-4 grid-flow-row gap-4 border items-center border-t-white/[0.2] border-b-white/[0.5] border-l-white/[0.2] border-r-white/[0.2] rounded-3xl bg-white bg-opacity-[5px] my-36">
          <section className="text-6xl text-center col-span-3">
            Projects
          </section>
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
