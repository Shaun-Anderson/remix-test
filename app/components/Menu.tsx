import { Menu as BaseMenu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { DotsVerticalIcon } from "@heroicons/react/solid";

export const Menu = () => {
  return (
    <BaseMenu as="div" className="relative inline-block text-left">
      <div>
        <BaseMenu.Button className="inline-flex w-full justify-center rounded-md bg-transparent px-2 py-2 text-sm font-medium text-violet-200 hover:text-indigo-500 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <DotsVerticalIcon className=" h-3 w-3 " aria-hidden="true" />
        </BaseMenu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <BaseMenu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <BaseMenu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Edit
                </button>
              )}
            </BaseMenu.Item>
            <BaseMenu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Duplicate
                </button>
              )}
            </BaseMenu.Item>
          </div>
        </BaseMenu.Items>
      </Transition>
    </BaseMenu>
  );
};
