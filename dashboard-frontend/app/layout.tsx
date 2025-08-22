import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Employee Management Dashboard",
  description: "A dashboard to manage employees and departments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Dashboard
              </Link>
              <div>
                <Link
                  href="/departments"
                  className="text-gray-600 hover:text-blue-500 mr-6"
                >
                  Departments
                </Link>
                <Link
                  href="/employees"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Employees
                </Link>
              </div>
            </nav>
          </header>
          <main className="flex-grow container mx-auto p-4 md:p-8">
            {children}
          </main>
          <footer className="text-center py-4 text-gray-500 text-sm">
            Microservices Demo App
          </footer>
        </div>
      </body>
    </html>
  );
}
