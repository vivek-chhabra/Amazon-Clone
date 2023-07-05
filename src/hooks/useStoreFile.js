import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";
import { useState } from "react";

export function useStoreFile() {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [url, setUrl] = useState([]);

    const uploadFile = async (path, fileObj) => {
        let URL;
        try {
            let res = await uploadBytes(ref(storage, path), fileObj);
            URL = await getDownloadURL(ref(storage, path));
            setUrl([...url, URL]);
            return URL
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    };
    return { error, isPending, uploadFile, url };
}
