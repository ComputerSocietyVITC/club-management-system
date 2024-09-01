// components/modals/achievementsmodal.tsx

import clsx from "clsx";

interface Achievement {
  id: number;
  title: string;
  description: string;
}

/* Temporary placeholder for the achievements modal */
const achievementsData: Achievement[] = [
  {
    id: 1,
    title: "Achievement 1",
    description: "Description of achievement 1",
  },
  {
    id: 2,
    title: "Achievement 2",
    description: "Description of achievement 2",
  },
  {
    id: 3,
    title: "Achievement 3",
    description: "Description of achievement 3",
  },
  {
    id: 4,
    title: "Achievement 4",
    description: "Description of achievement 4",
  },
  {
    id: 5,
    title: "Achievement 5",
    description: "Description of achievement 5",
  },
  {
    id: 6,
    title: "Achievement 6",
    description: "Description of achievement 6",
  },
];

const AchievementsModal = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "flex flex-col bg-white/[0.05] border-white/[0.2] text-white border p-4 rounded-lg shadow-lg",
        className
      )}
    >
      <h2 className="text-2xl font-bold mb-4">Achievements</h2>
      <div className="flex flex-col space-y-4">
        {achievementsData.map((ach) => (
          <div
            key={ach.id}
            className="bg-white/[0.05] border-white/[0.2] p-4 rounded-lg shadow-sm"
          >
            <h3 className="text-xl font-semibold">{ach.title}</h3>
            <p>{ach.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsModal;
