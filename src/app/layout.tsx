import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neo-purple min-h-screen">
        <header className="bg-neo-white border-neo border-neo-black shadow-neo">
          <div className="container-neo">
            <div className="flex items-center justify-between py-neo-lg">
              <h1 className="text-neo-title text-neo-black">
                React Cat Challenge
              </h1>
              <div className="text-neo-body text-neo-black">
                Neo Brutal design Cat App
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="container-neo">
            <div className="section-neo">{children}</div>
          </div>
        </main>

        <footer className="bg-neo-black text-neo-white border-neo border-neo-white">
          <div className="container-neo">
            <div className="py-neo-lg text-center">
              <p className="text-neo-body">Created by Alexandros Ntitoras</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
