import React from "react";
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Container } from "postcss";
import Image from "next/image";

const Dashboard = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {(await isAuthenticated())
          ? (console.log(user),
            (
              <div>
                Dashboard
                <div>
                  <Image
                    src={user.picture}
                    alt="Profile pic"
                    width={45}
                    height={45}
                  />
                  <h1>
                    {user.given_name} {user.family_name}
                  </h1>
                  <h2>{user.email}</h2>
                </div>
                <LogoutLink className="inline-block mt-8 underline text-blue-500">
                  Logout
                </LogoutLink>
              </div>
            ))
          : (console.log("not authenticated"), (<div>Login</div>))}
      </main>
    </div>
  );
};

export default Dashboard;
