import LoginForm from "@/src/modules/auth/LoginForm";

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-screen p-4  lg:ms-5">
      <div className="bg-white/50 backdrop-blur-sm max-w-md w-full p-6 rounded-2xl shadow-2xl ">
        <div className="flex items-center justify-center">
          <div className="font-semibold text-blue-950 text-4xl my-7">
            Sign in
          </div>
        </div>
        <LoginForm className="p-3" />
      </div>
    </main>
  );
}
