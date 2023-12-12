import { app } from "./firebaseConfig";
import { getFirestore, doc, setDoc, getDoc, getDocs, query, collection, where, and, orderBy, startAt, endAt } from "firebase/firestore";

const db = getFirestore(app)

class User {
    constructor(user_id, email, created_at) {
        this.user_id = user_id;
        this.email = email;
        this.created_at = created_at;
        this.balance = 0;
        this.s_requests = 0;
        this.f_requests = 0;
        this.ex_time = 0;
        this.api_keys = [];
        this.user_type = "new";
        this.bills = [];
    }
    toObject() {
        return {
            user_id: this.user_id,
            email: this.email,
            created_at: this.created_at,
            balance: this.balance,
            s_requests: this.s_requests,
            f_requests: this.f_requests,
            ex_time: this.ex_time,
            api_keys: this.api_keys,
            user_type: this.user_type,
            bills: this.bills,

        }
    }
}

export const setUser = async (user) => {
    const crTime = user.metadata.creationTime
    const crTimeParsed = new Date(crTime)
    const cuTime = new Date()
    const tDifference = cuTime - crTimeParsed
    if (tDifference > 5000) {
        return
    }
    const newUser = new User(user.uid, user.email, crTime)
    const userObject = newUser.toObject()
    const userRef = doc(db, "users", userObject.user_id)
    try {
        const response = await setDoc(userRef, userObject);
        return response
    } catch (error) {
        throw error
    }
}

export const getUser = async (user_id) => {
    try {
        const userRef = doc(db, "users", user_id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return userSnap.data()
        }
    } catch (error) {
        throw error
    }
}



export class GetModelPreviews {
    constructor() {
        this.modelsRef = collection(db, "model_previews");
    }

    async withRange(range) {
        const models = []
        try {
            const q = query(this.modelsRef,
                and(
                    where("index", ">=", range[0]),
                    where("index", "<=", range[1])
                )
            );
            const modelsSnapshot = await getDocs(q);
            modelsSnapshot.forEach((model) => {
                models.push(model.data())
            })
            return models
        } catch (error) {
            alert(error)
            throw error
        }
    }

    async withCategory(queryArray) {
        const models = []
        try {
            const q = query(this.modelsRef,
                where("categories", 'array-contains-any', queryArray)
            );
            const modelsSnapshot = await getDocs(q);
            modelsSnapshot.forEach((model) => {
                models.push(model.data())
            })
            return models
        } catch (error) {
            alert(error)
            throw error
        }
    }

    async withQuery(searchQuery) {
        const models = []
        try {
            const q = query(this.modelsRef,
                orderBy("id"),
                startAt(searchQuery),
                endAt(searchQuery + "\uf8ff")
            );
            const modelsSnapshot = await getDocs(q);
            modelsSnapshot.forEach((model) => {
                models.push(model.data())
            })
            return models
        } catch (error) {
            alert(error)
            throw error
        }
    }

}

export const GetModel = async (id) => {
    const docRef = doc(db, "models", "sdadsa")
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data()
        return data
    } else {
        return null
    }
}

export const addModel = async (modelPreviewData, modelData, modelID) => {
    await setDoc(doc(db, "model_previews", modelID), modelPreviewData)
    await setDoc(doc(db, "models", modelID), modelData)
}