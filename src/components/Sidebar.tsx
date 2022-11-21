import Link from "next/link";
import {
  ChartPieIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/solid";

export default function Sidebar() {
  return (
    <aside
      id="sidebar"
      className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
      aria-label="Sidebar"
    >
      <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 bg-white divide-y space-y-1">
            <ul className="space-y-2 pb-2">
              <li>
                <Link
                  href="/"
                  className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                >
                  <ChartPieIcon className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75" />
                  <span className="ml-3">ダッシュボード</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                >
                  <BuildingOfficeIcon className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75" />
                  <span className="ml-3">企業</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                >
                  <UserGroupIcon className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75" />
                  <span className="ml-3">求人</span>
                </Link>
              </li>
            </ul>
            <div className="space-y-2 pt-2">
              <Link
                href="/help"
                className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
              >
                <LifebuoyIcon className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75" />
                <span className="ml-3">ヘルプ</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
