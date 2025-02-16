import logo from "../../assets/image/favicon-32x32.png";

function Header() {
  return (
    <>
      <header className="flex justify-between items-center border-b  border-double border-gray-300 p-2 m-2">
        <div className="flex items-center ">
          <span className="rounded-sm bg-[#9d81a7] p-2 text-white">
            <img src={logo} alt="Logo" />
          </span>
          <span className="font-bold text-indigo-400  uppercase ml-2">
            Holidayz-world
          </span>
        </div>
        <a
          href="https://holidayz-info.netlify.app/"
          className="inline-block rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-3 focus:outline-hidden"
        >
          <span className="sr-only">Information</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#A5B4FC"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
        </a>
      </header>
    </>
  );
}

export default Header;
