import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../Firebase/firebase.js";


export const useAddInfo = () => {

    const userRef=collection(db, "users");

    const addUser=async({
        name,
        email,
        userId,
    })=>{
        console.log("add-user")  
        await addDoc(userRef, {      
            name,
            email,
            userId,
            timestamp: serverTimestamp()
        });

    }

    return{addUser}
}