import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

export const Navbar = () => {
  return (
    <div className="w-full h-16 px-10 flex justify-between items-center bg-slate-900">
      <h1 className="text-3xl font-semibold">Personal Finance App</h1>

      <SignedOut>
        <div className="flex justify-center items-center gap-10">
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex justify-center items-center gap-10">
          <SignOutButton />
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};
