//Email küldés
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const CLIENT_ID = '752848203008-jbhe568m50ha81rr8s5er0509bgir7rm.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04cH_U_Jr9u2eCgYIARAAGAQSNgF-L9IrowXrjnjyJKROU6OS73igC3GafvlRRAYTQJREUN9ZUY6JFoE48yiJmTBb8ijKdFb2Lw'

const multer = require('multer')

const cors = require('cors')

const fs = require('fs')

const bodyParser = require('body-parser')

var name;
var email;
var type;
var image;

var Storage = multer.diskStorage({
    destination: './images',
    filename: function(req, file, callback){
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})



var upload = multer({
    storage: Storage
});



const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})


//Projekthez kötés


const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { DefaultTransporter } = require('google-auth-library');
const { file } = require('googleapis/build/src/apis/file');
const PORT = process.env.PORT || 4200;

// Middleware
app.use(express.static('public'));
app.use(express.json(({limit: '50mb'})))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors());

app.use(express.static(__dirname + '/dist/proba'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname))
})

const server = http.createServer(app);
var ertek;

app.post('/', upload.single('file'), (req, res) =>{
    ertek = req.file;
    console.log(ertek);
})

app.post('/send', (req, res) => {
    console.log(req.body);
    try{
        const accesToken = oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'zsozsi1207@gmail.com',
                clientId : CLIENT_ID,
                clientSecret : CLIENT_SECRET,
                refreshToken : REFRESH_TOKEN,
                accessToken : accesToken
            }
        })

        const mailOptions = {
            from: `${req.body.email}`,
            to: 'sarkany.roland@outclass.hu',
            subject: 'Sim-kártya információ',
            html: `<p>Név: ${req.body.name}</p><p>E-mail: ${req.body.email}</p><p>Sim: ${req.body.type}<p>`,
        }

        const result = transport.sendMail(mailOptions)
        return result


    }catch(error){
        return error
    }
        
    })


app.listen(PORT, () =>{
    console.log(`Server running op port ${PORT}`);
})