import "./globals.css";
import { PitchProvider } from "./context/PitchContext";

export const metadata = {
  title: "PitchSprint",
  description: "Turn your ideas into a presentation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PitchProvider>
          <div className="ps-shell">
            {children}
          </div>
        </PitchProvider>
      </body>
    </html>
  );
}