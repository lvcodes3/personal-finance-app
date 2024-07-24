import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Landing = () => {
  const navigate = useNavigate();

  const { user } = useUser();

  if (user) {
    navigate("/");
  }

  return (
    <div className="w-screen min-h-[calc(100vh-64px)] pt-10 flex flex-col items-center gap-5 text-center">
      <h1 className="text-4xl font-medium">Personal Finance App</h1>

      <p className="">
        A place to track all of your expenses and earning. Simple to use and a
        great way to manage your financials.
      </p>

      <div className="w-[400px] h-[300px] relative">
        <img
          src="https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="finance"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Landing;
