import React from "react";

interface DeleteConfirmationModalProps {
  deleteConfirmation: string;
  handleDeleteMember: (id: string) => void;
  setDeleteConfirmation: (value: string) => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  deleteConfirmation,
  handleDeleteMember,
  setDeleteConfirmation,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[5000]">
      <div className="bg-transparent backdrop-blur-lg p-8 rounded-3xl border border-red-800 shadow-lg text-2xl">
        <p>Are you sure you want to delete this member?</p>
        <div className="flex justify-around mt-8">
          <button
            className=" text-white px-12 py-2 border border-red-800 rounded-3xl hover:bg-red-500 hover:bg-opacity-50"
            onClick={() => {
              handleDeleteMember(deleteConfirmation);
              setDeleteConfirmation("");
            }}
          >
            Yes
          </button>
          <button
            className="border text-white px-12 py-2 rounded-3xl hover:bg-white hover:bg-opacity-50"
            onClick={() => setDeleteConfirmation("")}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
