import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	  apiKey: "AIzaSyDOMSC7nbSTkkD4O2z4gs48idTjLrdooxw",
  authDomain: "edemy-courses.firebaseapp.com",
  projectId: "edemy-courses",
  storageBucket: "edemy-courses.firebasestorage.app",
  messagingSenderId: "713676642849",
  appId: "1:713676642849:web:903013b366ce99473f6160",
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }
