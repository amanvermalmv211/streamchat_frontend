import { useContext, useState } from "react";
import authContext from "../context/authContext";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthImagePattern from '../components/AuthImagePattern';

const LoginPage = () => {

  const context = useContext(authContext);
  const { isLoggingIn, login } = context;

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-800 text-gray-200">

      {/* left side */}

      <AuthImagePattern
        title="Welcome Back!"
        subtitle="Sign in to continue your communications and catch up with your messages."
      />

      {/* right side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-24">
        <div className="w-full max-w-md space-y-6">
          {/* LOGO */}
          <div className="text-center mb-4">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-slate-900 flex items-center justify-center 
              group-hover:bg-slate-950 transition-colors"
              >
                <MessageSquare className="size-6 text-violet-500 animate-pulse" />
              </div>
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="font-medium">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`w-full pl-10 bg-slate-900 p-2 rounded-lg`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="font-medium">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-10 bg-slate-900 p-2 rounded-lg`}
                  placeholder="••••••••"
                  value={formData.password}
                  autoComplete={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="bg-violet-600 rounded-lg p-1.5 text-lg w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <div className="flex items-center justify-center space-x-1">
                  <span>Loading...</span>
                  <Loader2 className="size-5 animate-spin inline-block" />
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-violet-400 underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;