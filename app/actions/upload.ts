"use server"

import { writeFile } from "fs/promises"
import { join } from "path"

export async function uploadFile(formData: FormData) {

    const file: File | null = formData.get('file') as unknown as File

    if (!file) {
        throw new Error('No file uploaded!')
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const path = join('./', 'tmp', file.name)
    await writeFile(path, buffer)

    console.log(`New file saved: ${path}`)

    return { success: true }

}
