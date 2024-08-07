 const functions = require("firebase-functions");
 const admin = require("firebase-admin");
 const nodemailer = require("nodemailer");
 require(dotenv).config();

 admin.initializeApp();
 const db = admin.firestore();

 const transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
         user: process.env.USER_EMAIL,
         pass: process.env.USER_PASSWORD,
     },
 });

//  functions to send emails to usersbooking for a 
exports.sendEmailToUsers = functions.firestore.document("usersBookings/{docId}").onCreate(async(snapshot)=> {
    const tourData = snapshot.data()
    const userEmail = tourData.email()

    const mailOptions = {
        from : process.env.USER_EMAIL,
        to : userEmail,
        subject : "Welcome to Zuru Tour",
        text : "Hi, Your booking for has been confirmed. We will contact you shortly to arrange the tour details",
    };
    try {
      await transporter.sendMail(mailOptions);  
    } catch (error) {
        console.log("error sending email",error);
        
    }
});