
// Import the functions from SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, setDoc, doc, runTransaction,deleteDoc } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCLDn5D3aBsoo52PwfzMmWA7Q1m_59E7ag",
	authDomain: "todo-app-b420a.firebaseapp.com",
	projectId: "todo-app-b420a",
	storageBucket: "todo-app-b420a.appspot.com",
	messagingSenderId: "828121890181",
	appId: "1:828121890181:web:c46b760987510293aa98ec",
	isTokenAutoRefreshEnabled: true,
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getTaskList = async () => {
	try {
		const q = query(collection(db, "tasks"));
		const taskSnapshot = await getDocs(q);
		const taskList = taskSnapshot.docs.map(doc => doc.data());
		return taskList;
	}
	catch(e) {
		console.log(e);
		//alert(e.message);
		return e;
	}

}

export const addTaskList = async (taskObj) => {
	console.log(taskObj)

	// Add a new document in collection "cities"

	return await setDoc(doc(db, "tasks", `${taskObj.id}`), taskObj);

}

export const setTaskList = async (taskObj) => {
	console.log(taskObj)
	try {
	const sfDocRef = doc(db, "tasks", `${taskObj.id}`);
		return await runTransaction(db, async (transaction) => {
		  const sfDoc = await transaction.get(sfDocRef);
		  if (!sfDoc.exists()) {
			throw "Document does not exist!";
		  }
	  
		  transaction.update(sfDocRef, { status: taskObj.status });
		});
		console.log("Transaction successfully committed!");
	  } catch (e) {
		console.log("Transaction failed: ", e);
	  }

}

export const deleteTaskFromStore = async (id) => {

	// Remove the 'capital' field from the document
	return await deleteDoc(doc(db, "tasks", `${id}`));
}