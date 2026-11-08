
import AnnouncementBar from "../layout/AnnouncementBar";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
