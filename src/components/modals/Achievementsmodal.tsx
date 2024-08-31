// components/modals/achievementsmodal.tsx

import clsx from "clsx";
import { useState } from "react";

interface Achievement {
  id: number;
  title: string;
  description: string;
}
{/* Temporary placeholder for the achievements modal */}

const achievementsData: Achievement[] = [
  { id: 1, title: "Achievement 1", description: "Description of achievement 1" },
  { id: 2, title: "Achievement 2", description: "Description of achievement 2" },
  { id: 3, title: "Achievement 3", description: "Description of achievement 3" },
  { id: 4, title: "Achievement 4", description: "Description of achievement 4" },
];

const AchievementsModal = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("flex flex-col bg-white p-4 rounded-lg shadow-lg", className)}>
      <h2 className="text-2xl font-bold mb-4">Achievements</h2>
      <div className="flex flex-col space-y-4">
        {achievementsData.map((ach) => (
          <div key={ach.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">{ach.title}</h3>
            <p>{ach.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsModal;
