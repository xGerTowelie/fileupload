import Link from "next/link";

export default function Home() {
    return (
        <>
            <Link className="px-4 py-2 bg-black text-white rounded-md" href="/client">Client (React)</Link>
            <Link className="px-4 py-2 bg-black text-white rounded-md" href="/server">Server (Next.Js)</Link>
        </>
    )
}
