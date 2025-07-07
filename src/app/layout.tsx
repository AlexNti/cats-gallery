import "./globals.css";
import { Tabs } from "@/components/tabs";
import { UserInitializer } from "@/components/userInitializer";
const tabItems = [
  {
    label: "Cat Images",
    href: "/",
  },
  {
    label: "Cat Breeds",
    href: "/breeds",
  },
  {
    label: "Favorites",
    href: "/favorites",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body className="bg-neo-purple min-h-screen flex flex-col">
        <header className="bg-neo-white border-neo border-neo-black shadow-neo">
          <div className="container-neo">
            <div className="flex items-center justify-between py-neo-lg">
              <h1 className="text-neo-title text-neo-black">
                React Cat Challenge
              </h1>
              <div className="text-base text-neo-black">
                Neo Brutal design Cat App
              </div>
            </div>
            <div className="pb-neo-lg">
              <Tabs items={tabItems} />
            </div>
          </div>
        </header>

        <main className="flex-1 pb-2">
          <div className="container-neo">
            <div className="section-neo">{children}</div>
          </div>
        </main>
        <UserInitializer />

        <footer className="bg-neo-black text-neo-white border-neo border-neo-white">
          <div className="container-neo">
            <div className="py-neo-lg text-center">
              <p className="text-base">Created by Alexandros Ntitoras</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
