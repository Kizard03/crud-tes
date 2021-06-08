import globalConfig from '@/config/global-config';
import firebase from 'firebase';

const config = firebase.initializeApp(globalConfig.firebase);

export const db = config.firestore();
export const usersCollection = db.collection('users');