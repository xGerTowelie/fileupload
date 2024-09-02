import { useState } from "react"
import clsx from 'clsx'

export default function FileUpload() {
    const [dragActive, setDragActive] = useState(false)
    const [files, setFiles] = useState<File[]>([])

    function truncateLength(text: string, maxLength: number = 20): string {
        if (text.length <= maxLength) return text

        const startLength = Math.ceil((maxLength - 3) / 2)
        const endLength = Math.floor((maxLength - 3) / 2)

        return `${text.substring(0, startLength)}...${text.substring(text.length - endLength)}`
    }


    function stripFileExtension(filename: string): string {
        const lastDotIndex = filename.lastIndexOf(".")
        if (lastDotIndex === -1) return filename
        return filename.substring(0, lastDotIndex)
    }

    function formatBytes(bytes: number): string {
        if (bytes === 0) return "0 Bytes"

        const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
        const i = Math.floor(Math.log(bytes) / Math.log(1024))
        const value = bytes / Math.pow(1024, i)

        return `${value.toFixed(1)} ${sizes[i]}`
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.currentTarget.contains(e.relatedTarget as Node)) return

        setDragActive(false)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFiles([...files, ...Array.from(e.dataTransfer.files)])
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles([...files, ...Array.from(e.target.files)])
        }
    }

    const handleRemoveFile = (filename: string) => {
        setFiles(files.filter(file => file.name !== filename))
    }

    return (
        <div
            className={clsx("flex flex-col items-center justify-center py-4 px-8 w-full min-h-[250px] bg-slate-200 border-2 border-dashed border-slate-400 rounded-xl", {
                "bg-red-300": dragActive,
            })}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {
                files.length === 0
                    ? (
                        <>
                            <h1>Drag &amp; Drop Files</h1>
                            <span className="text-3xl text-gray-300 my-4">- or -</span>
                            <input
                                type="file"
                                name="files"
                                multiple
                                onChange={handleFileSelect}
                                className="mt-2"
                            />
                        </>
                    )
                    : <table style={{
                        borderCollapse: "separate",
                        borderSpacing: "0 6px"
                    }}
                        className="w-full text-center">
                        <thead className="font-semibold text-xl">
                            <tr>
                                <td className="text-left pl-2">Name</td>
                                <td>Type</td>
                                <td>Size</td>
                                <td>Remove</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                files.map((file: File) => (
                                    <tr key={file.name} className="bg-slate-50">
                                        <td className="py-2 pl-2 text-left">{truncateLength(stripFileExtension(file.name), 30)}</td>
                                        <td className="px-2" >{file.type}</td>
                                        <td className="px-2">{formatBytes(file.size)}</td>
                                        <td className="px-2">
                                            <button
                                                className="size-6 rounded bg-slate-800 text-white"
                                                onClick={() => handleRemoveFile(file.name)}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}
