import React, { useState } from "react";
import { Search } from "lucide-react";
import { DataContext } from "../Contexts/Contexts";

export default function NavBar() {
  const [searchShow, setSearchShow] = useState(false);
  const { fetchAPI, data } = React.useContext(DataContext);
  const onSubmit = (e: React.FormEvent)=>{
    e.preventDefault()
    const formEl = e.currentTarget as HTMLFormElement;
    const formData = new FormData(formEl);
    const search = formData.get("search").toString().trim();
    setSearchShow(false)
    fetchAPI(search, 'user');
  }
  return (
    <nav className="w-full mt-4 h-16 bg-gray-100 rounded-md drop-shadow-md px-10 text-white flex items-center justify-between px-4">
      <h1 className="relative text-2xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
        Github-Profile
        <span className="absolute -top-1 pl-2 text-sm font-normal bg-gradient-to-r from-green-700 to-green-500 bg-clip-text">
          {data?.data?.location || ""}
        </span>
      </h1>
      {searchShow ? (
        <form className=" flex border border-green-600 rounded-2xl" onSubmit={(e)=>onSubmit(e)}>
          <input
            type="text"
            name="search"
            id="search"
            className="outline-0 text-green-700 font-semibold pl-3"
            placeholder="Username..."
            required
          />
          <button
            type="submit"
            title="Search-btn"
            className="group rounded-full p-1 cursor-pointer hover:bg-green-700 transition-all duration-300"
          >
            <Search className="text-green-700 group-hover:text-white transition-all duration-300" />
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setSearchShow(true)}
          title="Search-btn"
          className="group rounded-full p-1 cursor-pointer hover:bg-green-700 transition-all duration-300"
        >
          <Search className="text-green-700 group-hover:text-white transition-all duration-300" />
        </button>
      )}
    </nav>
  );
}
