import React, { FC, ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      {children}
    </main>
  );
};

export default Layout;
