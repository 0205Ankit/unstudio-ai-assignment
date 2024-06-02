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
      <div className="m-10 flex gap-10">
        <DragProvider>
          <Canvas />
          <Gallery />
        </DragProvider>
      </div>
    </main>
  );
}
