import { useState } from "react";
import { DataContext } from "./Contexts/Contexts";
import Home from "./pages/home";
import Loader from "./componets/Loader";
import NavBar from "./componets/NavBar";
import { Search } from "lucide-react";

export default function App() {
  const [data, setData] = useState({
    data: null,
    option: null,
    loading: false,
    error: null,
  });

  function fetchAPI(pathe: string, options?: string) {
    setData((prev) => ({ ...prev, loading: true, error: null }));
    return fetch(`https://api.github.com/users/${pathe}`)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: any) => {
        setData((prev) => ({ ...prev, data, loading: false ,option: options}));
      })
      .catch((error: Error) => {
        setData((prev) => ({ ...prev, error: error.message, loading: false,option: options }));
      });
  }

  const onSubmit = (e: React.FormEvent)=>{
      e.preventDefault()
      const formEl = e.currentTarget as HTMLFormElement;
      const formData = new FormData(formEl);
      const search = formData.get("search").toString().trim();
      fetchAPI(search, 'user');
    }

    // switch (data.option) {
    //   case 'user':
    //     setDisplay(<Home />);
    //     break;
    
    //   default:
    //     setDisplay(null);
    //     break;
    // }

  return (
    <DataContext.Provider value={{ data, setData, fetchAPI }}>
      {data.loading ? (
        <Loader />
      ) : (
        <main className="w-full h-full max-w-7xl mx-auto">
          {data.data ? (
            <>
              <NavBar />
              data.option === 'user' && <Home />
            </>
          ) : (
            <div className="w-full h-screen flex items-center justify-center flex-col gap-3">
              <h1 className="text-3xl font-bold text-green-700 text-center">
                Search for a Github Profile
              </h1>
                <form
                  className="flex border border-green-600 rounded-2xl text-2xl"
                  onSubmit={(e) => onSubmit(e)}
                >
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
            </div>
          )}
        </main>
      )}
    </DataContext.Provider>
  );
}
