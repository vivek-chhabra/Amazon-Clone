import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";
import { useState } from "react";

export function useStoreFile() {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const uploadFile = async (path, fileObj) => {
        let url;
        try {
            let res = await uploadBytes(ref(storage, path), fileObj);
            url = await getDownloadURL(ref(storage, path));
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
        return url;
    };
    return { error, isPending, uploadFile };
}
