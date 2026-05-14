"use client";

import Image from "next/image";

export default function Home() {
	const handleLogin = async () => {
    try {
      // Redirect to the backend login endpoint
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/login`;
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  
  return (
    <main className="relative">
      <div className="flex min-h-screen flex-col items-center justify-center p-8 z-20 relative">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] lg:ml-70 lg:w-[500px]">
          <div className="flex flex-col space-y-2 text-center lg:text-left">
            <h1 className="lg:text-5xl text-4xl font-bold mb-8">Earthquake Infrastructure Damage Classifier 🌎</h1>
            <p className="text-muted-foreground text-md">
              Description of the dashboard interface, its functionality and the project context.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-10 lg:w-[400px]">
            <div className="relative">
              <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-2 bg-white text-black border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                Continue with Google
              </button>
            </div>
            {/* Think we're only supporting Google auth for now */}
            {/* <button className="w-full bg-[#B59F7F] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#a38f71]">
							Continue with Email
						</button> */}
          </div>
        </div>
      </div>
    </main>
  );
}
