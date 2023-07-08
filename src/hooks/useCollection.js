import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { CollectionContext } from "../context/CollectionContext";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";

export function useCollection(keyRef, key = null, value = null) {
    const [error, setError] = useState(null);
    const [document, setDocument] = useState([]);

    // collection context
    const { dispatch } = useContext(CollectionContext);

    // collection reff
    const collRef = collection(db, keyRef);
    const q = query(collRef, where("uid", "==", `${auth?.currentUser?.uid}`));

    let qr;
    if (!key || !value || value === "all") {
        qr = collection(db, keyRef);
    } else if (value === "mine") {
        qr = query(collRef, where("uid", "==", `${auth?.currentUser?.uid}`));
    } else {
        qr = query(collRef, where(key, "==", value));
    }

    useEffect(() => {
        // real time collection of the data
        const unSub = onSnapshot(
            qr,
            (snapshot) => {
                setDocument(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                // dispatch({ type: "ADD_DOCUMENTS", payLoad: snapshot.docs.map((transac) => ({ ...transac.data(), id: transac.id })) });
                // update state error
                setError(null);
            },
            (err) => {
                console.log(err.message);
                dispatch({ type: "ERROR", payLoad: err.message });
                setError("Could not fetch the data");
            }
        );

        // unsubscribe on unmount
        return () => unSub();
    }, [key, value, keyRef]);

    return { error, document };
}
