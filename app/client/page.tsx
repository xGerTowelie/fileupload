"use client"

import { useState } from "react"

export default function Client() {
    const [file, setFile] = useState<File>()

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!file) return

        try {
            const data = new FormData()
            data.set('file', file)

            const res = await fetch('/api/upload/client', {
                method: 'POST',
                body: data
            })

            if (!res.ok) throw new Error(await res.text())
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <h1>Client</h1>
            <form onSubmit={onSubmit}>
                <input type="file" onChange={e => setFile(e.target.files?.[0])} />
                <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-md">
                    Upload
                </button>
            </form>
        </div>
    )
}
