import Link from "next/link";
import {
  ChartPieIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  LifebuoyIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

export default function AppSidebar() {
  return (
    <aside
      id="app-sidebar"
      className="fixed z-20 h-full top-0 left-0 bottom-0 flex lg:flex flex-shrink-0 flex-col w-52 transition-width duration-75 bg-white border-r border-gray-200"
      aria-label="Sidebar"
    >
      <div className="flex-1 flex flex-col pt-2 pb-4 overflow-y-auto">
          <div className="flex-1 px-2 divide-y space-y-1">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/dashboard"
                  className="text-base text-indigo-600 font-normal rounded-lg flex items-center p-2 hover:bg-indigo-100 group"
                >
                  <ChartPieIcon className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700 transition duration-75" />
                  <span className="ml-3">ダッシュボード</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-base text-indigo-600 font-normal rounded-lg flex items-center p-2 hover:bg-indigo-100 group"
                >
                  <BuildingOfficeIcon className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700 transition duration-75" />
                  <span className="ml-3">企業</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-base text-indigo-600 font-normal rounded-lg flex items-center p-2 hover:bg-indigo-100 group"
                >
                  <UserGroupIcon className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700 transition duration-75" />
                  <span className="ml-3">求人</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-base text-indigo-600 font-normal rounded-lg flex items-center p-2 hover:bg-indigo-100 group"
                >
                  <BookOpenIcon className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700 transition duration-75" />
                  <span className="ml-3">Docs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-base text-indigo-600 font-normal rounded-lg hover:bg-indigo-100 group transition duration-75 flex items-center p-2"
                >
                  <LifebuoyIcon className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700 transition duration-75" />
                  <span className="ml-3">ヘルプ</span>
                </Link>
              </li>
            </ul>
          </div>
      </div>
    </aside>
  );
}
