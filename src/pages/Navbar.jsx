import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useContext } from "react";
import authContext from "../context/authContext";

const Navbar = () => {

  const context = useContext(authContext);
  const { logout, authUser } = context;

  return (
    <header className="bg-slate-950 text-gray-200 border-b fixed w-full top-0 z-40 backdrop-blur-lg px-4 h-16">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="size-12 rounded-xl bg-slate-800 flex items-center justify-center">
              <MessageSquare className="size-6 text-violet-500" />
            </div>
            <h1 className="text-lg font-bold">Stream Chat</h1>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to={"/settings"} className={`flex items-center bg-slate-800 gap-2 p-0.5 px-2 rounded-md`}>
            <Settings className="size-5" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link to={"/profile"} className={`flex items-center bg-slate-800 gap-2 p-0.5 px-2 rounded-md`}>
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button className="flex items-center bg-slate-800 gap-2 p-0.5 px-2 rounded-md" onClick={logout}>
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;