import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Modal = ({ isOpen, onClose, children, title }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <>
      {isOpen ? (
        <div
          className="modal z-50"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex h-screen">
              <div className="mx-auto flex items-center object-center text-center">
                <div className="relative my-5 mx-auto w-[500px] transform overflow-hidden rounded-lg text-left shadow-xl transition-all">
                  <div className="bg-white">
                    <div className="modal-content items-start">
                      <div className="p-5">
                        <div className="flex flex-shrink-0 justify-between">
                          <p className="text-lg font-bold">{title}</p>
                          <div className="text-right">
                            <button
                              type="button"
                              className="btn-close box-content h-7 w-7 rounded-none text-right text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                              onClick={closeModal}
                            >
                              <XMarkIcon />
                            </button>
                          </div>
                        </div>
                        <hr />
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
