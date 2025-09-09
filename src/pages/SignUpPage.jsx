import { useContext, useState } from "react";
import authContext from "../context/authContext";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthImagePattern from '../components/AuthImagePattern';

const SignUpPage = () => {

  const context = useContext(authContext);
  const { isSigningUp, signup } = context;

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-800 text-gray-200">
      {/* left side */}
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
              <h1 className="text-2xl font-bold">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="font-medium">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`w-full pl-10 bg-slate-900 p-2 rounded-lg`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

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

            <button type="submit" className="bg-violet-600 rounded-lg p-1.5 text-lg w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <div className="flex items-center justify-center space-x-1">
                  <span>Loading...</span>
                  <Loader2 className="size-5 animate-spin" />
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-violet-400 underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default SignUpPage;