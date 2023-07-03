import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { useStoreFile } from "../../hooks/useStoreFile";
import React, { useEffect, useState } from "react";
import { useInput } from "../../hooks/useInput";
import { auth } from "../../firebase/config";
import { ErrorMsg, PrimaryMsg, SuccessMsg } from "../../helpers";
import "./SellProduct.css";

export default function SellProduct() {
    // states for the product information
    const [pName, UpdatePName, resetPName] = useInput("");
    const [pBrand, updatePBrand, resetPBrand] = useInput("");
    const [pDiscription, UpdatePDiscription, resetPDiscription] = useInput("");
    const [pPrice, updatePPrice, resetPPrice] = useInput("");
    const [pColor, updatePColor, resetPColor] = useInput("");
    const [pFeatures, updatePFeatures, resetPFeatures] = useInput("");
    const [pDeliveryDur, updatePDeliveryDur, resetPDeliveryDur] = useInput("");
    const [pWeight, updatePWeight, resetPWeight] = useInput("");
    const [pWarrenty, updatePWarrenty, resetPWarrenty] = useInput("");
    const [formErr, setFormErr] = useState(null);

    // useFirestore hook
    const { addDocument, response } = useFirestore();
    const { error, isPending, document, success } = response;

    // useStoreFile hook
    const { uploadFile, url } = useStoreFile();

    const handleFileInput = async (e) => {
        let selected = e.target.files;

        setFormErr(null);

        Object.values(selected).forEach((file) => {
            if (!file.type.includes("image")) {
                setFormErr("Selected Files Should be an Image Type");
            } else if (file.size > 300000) {
                setFormErr("File Size Should Not Be Higher Than 300KBs");
                window.scrollTo(0, 0);
                return;
            }
        });
        await Object.values(selected).forEach(async (file) => {
            await uploadFile(`productImages/${auth?.currentUser?.uid}/${file.name}`, file);
        });
    };

    // product object to be stored at the database
    const product = { pName, pPrice, pBrand, pImage: url, pColor, pDeliveryDur, pFeatures: pFeatures.split(','), pWeight, pWarrenty, createdBy: { name: auth?.currentUser?.displayName, uid: auth?.currentUser?.uid, photoURL: auth?.currentUser?.photoURL } };

    // handling the submission product form
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErr(null);

        if (pPrice <= 0) {
            setFormErr("Price Should Be Higher Than 0");
            window.scrollTo(0, 0);
            return;
        }

        // adding doc if there is no error
        addDocument("products", product);
    };

    console.log(document);

    const throwErr = () => {
        if (formErr) {
            return <ErrorMsg error={formErr} />;
        } else if (error) {
            return <ErrorMsg error={error} />;
        }
    };

    useEffect(() => {
        // reseting the input fields
        if (success) {
            resetPName();
            resetPPrice();
            resetPBrand();
            resetPDiscription();
            resetPColor();
            resetPFeatures();
            resetPDeliveryDur();
            resetPWeight();
            resetPWarrenty();
        }
        if (error || formErr) {
            window.scrollTo(0, 0);
        }
    }, [success, error, formErr]);

    return (
        <div className="SellProduct flex-column">
            <div className="container">
                {throwErr()}
                {isPending && <PrimaryMsg msg={"Adding the Product..."} />}
                {success && <SuccessMsg msg={"Added the Product Successfully!"} />}

                <form className="flex-column" onSubmit={handleSubmit} style={error ? { marginTop: "30px" } : { marginTop: "0px" }}>
                    <h2 className="page-title">Add Product Details</h2>
                    <div className="info flex" id="row-1">
                        <div className="product-name">
                            <label htmlFor="p-name" className="form-label">
                                Product Name :
                            </label>
                            <input type="text" required value={pName} onChange={UpdatePName} className="shadow-none form-control" id="p-name" aria-describedby="emailHelp" />
                        </div>
                        <div className="product-brand">
                            <label htmlFor="p-brand" className="form-label">
                                Product Brand :
                            </label>
                            <input type="text" required value={pBrand} onChange={updatePBrand} className="shadow-none form-control" id="p-brand" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div className="info" id="row-2">
                        <label htmlFor="floatingTextarea2">Product Discription : </label>
                        <div className="form-floating">
                            <textarea className="form-select shadow-none" value={pDiscription} placeholder="Discribe the Product in 2 - 3 Lines" onChange={UpdatePDiscription} id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                        </div>
                    </div>
                    <div className="info flex" id="row-3">
                        <div className="mb-0">
                            <label htmlFor="p-price" className="form-label">
                                Price :
                            </label>
                            <input type="number" placeholder="in rupees" required value={pPrice} onChange={updatePPrice} className="shadow-none form-control" id="p-price" />
                        </div>
                        <div className="mb-0">
                            <label htmlFor="p-color" className="form-label">
                                Color :
                            </label>
                            <input type="text" required value={pColor} onChange={updatePColor} className="shadow-none form-control" id="p-color" />
                        </div>
                    </div>
                    <div className="mb-0 info" id="row-4">
                        <label htmlFor="p-img" className="form-label">
                            Select Product Images :
                        </label>
                        <input type="file" required multiple onChange={handleFileInput} className="shadow-none form-control" id="p-img" />
                    </div>
                    <div className="mb-0 info" id="row-5">
                        <label htmlFor="feature">Product Features : </label>
                        <div className="form-floating">
                            <textarea className="form-select shadow-none" placeholder="Divide features by a comma" value={pFeatures} onChange={updatePFeatures} id="feature" style={{ height: "100px" }}></textarea>
                        </div>
                    </div>
                    <div className="info flex" id="row-6">
                        <div className="mb-0">
                            <label htmlFor="dur">Delivery Duration : </label>
                            <input type="number" required value={pDeliveryDur} onChange={updatePDeliveryDur} placeholder="days" className="shadow-none form-control" id="dur" />
                        </div>
                        <div className="mb-0">
                            <label htmlFor="weight">Product Weight : </label>
                            <input type="number" required value={pWeight} placeholder="in kgs" onChange={updatePWeight} className="shadow-none form-control" id="weight" />
                        </div>
                        <div className="mb-0">
                            <label htmlFor="warrenty">Product Warrenty : </label>
                            <input type="number" required placeholder="days" value={pWarrenty} onChange={updatePWarrenty} className="shadow-none form-control" id="warrenty" />
                        </div>
                    </div>
                    {isPending ? (
                        <button type="submit" disabled className="btn btn-primary">
                            Adding Product...
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-primary">
                            Add The Product
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
