export default function Footer() {
  return (
    <footer className="bg-white shadow rounded-lg p-4 md:p-6 xl:p-8 my-6 mx-4">
      <ul className="flex items-center flex-wrap mb-6 md:mb-0">
        <li>
          <a
            href="#"
            className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6"
          >
            利用規約
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6"
          >
            プライバシーボリシー
          </a>
        </li>
      </ul>
    </footer>
  );
}
