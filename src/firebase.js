// // Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app";
// import 'firebase/compat/messaging';
//
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
//
// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBE0z6GXkrIJpIzIqfbBk8WnbXppRQDIJo",
//     authDomain: "humo-market-crm.firebaseapp.com",
//     projectId: "humo-market-crm",
//     storageBucket: "humo-market-crm.appspot.com",
//     messagingSenderId: "17540875019",
//     appId: "1:17540875019:web:8b179c6d3f65262b8d580e"
// };
//
// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
//
// const messaging = firebase.messaging();
//
// export const getToken = (setTokenFound) => {
//     return messaging.getToken({vapidKey: 'BP3XV4eEBmMfrNc1ESe9JVJ4EPYA_iGxLPHr8UgZbgavFanZdYG6tzaJDfC1fH26I7cq5XbMESpqLMQcQfQNE5o'}).then((currentToken) => {
//         if (currentToken) {
//             console.log('current token for client: ', currentToken);
//             setTokenFound(true);
//             // Track the token -> client mapping, by sending to backend server
//             // show on the UI that permission is secured
//         } else {
//             console.log('No registration token available. Request permission to generate one.');
//             setTokenFound(false);
//             // shows on the UI that permission is required
//         }
//     }).catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//         // catch error while creating client token
//     });
// }
//
// export default app;
