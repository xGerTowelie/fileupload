import { uploadFile } from "../actions/upload";

export default function Server() {
    return (
        <div>
            <h1>Server</h1>
            <form action={uploadFile}>
                <input type="file" name="file" />
                <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-md">
                    Upload
                </button>
            </form>
        </div>
    )
}
