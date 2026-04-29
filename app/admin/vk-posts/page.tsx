import Link from "next/link";
import VkPostsSyncPanel from "@/components/VkPostsSyncPanel";

export default function VkPostsAdminPage() {
  return (
    <main className="min-h-screen bg-[#f0f5f6] px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-6 inline-flex text-sm font-medium text-[#0077ff] hover:text-[#0067dd]"
        >
          На сайт
        </Link>
        <VkPostsSyncPanel />
      </div>
    </main>
  );
}
