import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
// import Header from "./_components/common/Header";

const MainLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    console.log("not authenticated");
    redirect("/unauthenticated");
  }
  return (
    <div
      className="w-full h-auto min-h-screen
     !bg-[#f8f8f8] dark:!bg-background"
    >
      <h1 className="text-5xl font-semibold">xCelratR</h1>
      <h3 className="text-sm font-thin">
        A launch pad to accelerate your career
      </h3>
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
