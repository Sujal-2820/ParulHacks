import React from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const dropIn = {
  hidden: {
    x: "100vh",
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    x: "100vh",
    opacity: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
};

const Sidebar = ({ setMobileMenuOpen, mobileMenuOpen, navigation }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        <Dialog
          key={mobileMenuOpen}
          as="div"
          className="lg:hidden flex flex-col justify-center items-center  "
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <Dialog.Panel className="fixed  right-0 inset-y-10 z-50 min-w-[250px] w-8/12 md:w-6/12 bg-transparent">
            <Backdrop onClick={() => setMobileMenuOpen(false)}>
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal orange-gradient"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="mt-6 bg-grad-shivam rounded-3xl flow-root h-[90vh]">
                  <div className="flex items-center justify-center">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.2 }}
                      className="-my-5 rounded-md p-2.5 btn-grad text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </motion.button>
                  </div>
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-4 mt-9  flex flex-col gap-5 justify-start items-center py-6">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-mx-3 mt-2 block w-7/12 text-center border border-b-2 hover:bg-emerald-300 rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="py-6 text-center">
                      <Link
                        to={"/login"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="btn-grad p-3 -mt-2 mb-1"
                      >
                        Log in
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Backdrop>
          </Dialog.Panel>
        </Dialog>
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
