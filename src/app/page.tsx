import Canvas from "@/components/canvas";
import Gallery from "@/components/gallery";
import Header from "@/components/header";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { DragProvider } from "./(context)/drag-context-provider";

export default async function HomePage() {
  const session = await getServerAuthSession();
  if (!session?.user) return redirect("/login");

  return (
    <main>
      <Header />
      <p className="mt-5 text-center text-xl font-medium">
        Drag and drop images from your Gallery to the Canvas below and start
        editing them
      </p>
      <div className="mx-10 mb-10 mt-5 flex gap-10">
        <DragProvider>
          {/* <Canvas /> */}
          <Gallery />
        </DragProvider>
      </div>
    </main>
  );
}
