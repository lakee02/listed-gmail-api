const nodemailer=require('nodemailer')
const { google } = require('googleapis');

// Google API credentials and configuration
const CLIENT_ID = '269538434050-3uruelhs1mmutd93oi4mrtiagv7anup1.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04W6bRakp9M0lCgYIARAAGAQSNwF-L9IrF4z13rCLjdfJ1ucR6ld3PpgBTi_rB0CUMxYZfXqAA1FnmcVQfFix13d2qPDUh3YgQo0';


const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


async function sendMail() {
  try {
    
    const accessToken=await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        type:'OAuth2',
        user:'luckymangal02@gmail.com',
        clientId:CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        refreshToken:REFRESH_TOKEN,
        accessToken:accessToken
      }
    })

    const mailOptions={
      from:'YoursTruly  <luckymangal02@gmail.com>',
      to:'shivshankarmangal8@gmail.com',
      subject:"Hello from gmail using api",
      text:'Hello from gmail email using api',
      html:'<h1>Hello from gmail email using api</h1>'
    }

    const result=await transport.sendMail(mailOptions);
    return result

  } 
  catch (error) {
    return error;
  }
}


sendMail()
  .then(result=>console.log('Email sent..',result))
  .catch((error)=> console.log(error.message));