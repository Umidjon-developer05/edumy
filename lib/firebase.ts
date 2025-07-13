import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyCYmasMdoGWiyw5A6E9n7epqBYxtkVFYnY',
	authDomain: 'Edumy-course-platform.firebaseapp.com',
	projectId: 'Edumy-course-platform',
	storageBucket: 'Edumy-course-platform.firebasestorage.app',
	messagingSenderId: '642631693516',
	appId: '1:642631693516:web:c3724bf62790c66627be69',
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }
