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
      <h1>Header</h1>
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
