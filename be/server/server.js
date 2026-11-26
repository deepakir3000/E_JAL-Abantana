//import configurations
require('./config/config');
const {
    logger
} = require('./config/log-config');
const _ = require('lodash');
var hpp = require('hpp');
var https = require('https');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var express = require('express');
const helmet = require('helmet')
var cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
var { sql } = require('./db/sql');
var fs = require('fs');
var session = require('express-session');
const LOG = logger.getLogger('server.js');
const path = require('path');
const cron = require('node-cron');
const { WorkflowExecutionLog } = require('./models/workflow/workflowexecutionlog.js');
const { Holidays } = require('./models/uac/holidayslist.js');
const { Application } = require('./models/formaction/applicationdetails.js');
const GetSCrollData = require('./services/common/CommonServiceImpl.js')
var app = express();
const port = process.env.PORT || 3001;


//use below express middleware statement to parse the request body aloways to a json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/server/WaterMgmt/media/', express.static(path.join(__dirname, '/WaterMgmt/media')));
app.use(express.static(path.join(__dirname, 'angularApp')));



app.use(hpp());
app.use(cookieParser());

app.use(helmet())

app.use((err, req, res, next) => {
    if (err) {
        console.log('Invalid Request data')
        res.status(400).send('Invalid Request data')
    } else {
        next()
    }
})

// const corsOptions = {
//     origin: 'http://localhost:4200', // or an array/function for multiple environments
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//     allowedHeaders: ['Authorization', 'Content-Type', 'x-auth', 'Origin'],
//     exposedHeaders: ['Authorization', 'Content-Type', 'x-auth', 'Origin'],
//     maxAge: 1800
// };

// app.use(cors(corsOptions));

app.use(cors());  // { origin: 'https://waterallocationod.nic.in',optionsSuccessStatus: 200, credentials: true }
app.use((req, res, next) => {
    //if (req.header("Origin") === 'http://10.242.78.182') {
    console.log("ORIGIN-----", req.header("Origin"));
    // res.header("Access-Control-Allow-Origin", req.header("Origin")); //http://localhost:4200 req.header("Origin")
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); //http://localhost:4200 req.header("Origin")
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST"); //"GET, POST, PUT, DELETE"
    res.header("Access-Control-Max-Age", "1800");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type, x-auth, Authorization,Origin");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type, x-auth, Authorization,Origin");
    res.header("Access-Control-Expose-Headers", "Authorization, Content-Type, x-auth, Authorization,Origin");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    // console.log('req.method-------',req.method);

    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }

    // if (req.method === 'OPTIONS') {
    //     return res.status(404).json({});
    // }
    // } else {
    //     console.log('Invalid Origin')
    //     res.status(400).send('Invalid Origin')
    // }
    next();
});

var router = express.Router();
app.use((req, res, next) => {
    var now = new Date().toString();
    LOG.info(`${now} : ${req.method} ${req.url}`); //logger
    next();
});

app.set('trust proxy', 1)
app.use(session({
    secret: 'its a secret!',
    key: 'JSESSIONID',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 12000000,
        httpOnly: true
    }
}))

/* const readServerConfiguration = async () => {
    var connectionJson = {
      "uri": dbconfig.uri,
      "sslPem": fs.readFileSync(process.env.sslpem_filepath),
      "sslCert": fs.readFileSync(process.env.sslcrt_filepath),
      // sets how many times to try reconnecting
      reconnectTries: Number.MAX_VALUE,
      // sets the delay between every retry (milliseconds)
      reconnectInterval: 1000
    }
    return connectionJson
  };

  const startServer = async () => {
    const serverConfiguration = await readServerConfiguration();
  };
  startServer(); */

//Routes configurations
var loginRoutes = require('./controllers/login/LoginController.routes.js');
loginRoutes(router);
var uacRoutes = require('./controllers/uac/uacController.routes.js');
uacRoutes(router);
var commonRoutes = require('./controllers/common/commonController.routes.js');
commonRoutes(router);
let mdmRoutes = require('./controllers/mdm/mdmController.routes.js');
mdmRoutes(router);
let formActionRoutes = require('./controllers/formaction/formActionController.routes.js');
formActionRoutes(router);
let reportActionRoutes = require('./controllers/report/reportControoler.routes.js');
reportActionRoutes(router);

let appealRoutes = require('./controllers/appeal/AppealLogin.routes.js');
appealRoutes(router);

/*****************************************************************************************************************
 *HTTPS SERVER
 * ***************************************************************************************************************/

// const https_options = {
//   key: fs.readFileSync('/etc/letsencrypt/live/waterallocationod.nic.in/privkey.pem', 'utf8'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/waterallocationod.nic.in/cert.pem', 'utf8'),
//   ca: [fs.readFileSync('/etc/letsencrypt/live/waterallocationod.nic.in/fullchain.pem', 'utf8')
//       ],
//   //secureProtocol:'TLSv1_2_server_method'
//   secureOptions: crypto.SSL_OP_NO_SSLv2 | crypto.SSL_OP_NO_SSLv3 | crypto.SSL_OP_NO_TLSv1 | crypto.SSL_OP_NO_TLSv1_1
// };

app.listen(port, () => {
    LOG.info(`App started up at port : ${port}`);
});

//  var httpsServer = https.createServer(https_options, app);
// //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// httpsServer.listen(port, function (err) {
//   if (err) {
//     LOG.error(`App started up at port : ${err}`);
//   } else {
//     LOG.info(`App started up at port : ${port}`);
//   }
// }); 


// Water department code and date (you may fetch or update dynamically)
const deptCode = 'WAR'; // Replace with actual department code
// const scrollDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
// const scrollDate ='2024-09-18';
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1); // Move back one day
const scrollDate = yesterday.toISOString().split('T')[0];

// Function to fetch data from API
function fetchDataFromAPI(deptCode, scrollDate) {
    console.log('running', deptCode, scrollDate);

    const options = {
        hostname: 'www.odishatreasury.gov.in', // No 'https://' here
        path: `/echallanservices/v0.2/depts2sscroll/${deptCode}/${scrollDate}`, // Path starts after the domain name
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'node.js', // Some APIs require this header
        },
    };
    console.log(options, 'options...............');

    const req = https.request(options, (res) => {
        console.log(res.statusCode, 'res.statusCode');

        let data = '';

        // Collect response data
        res.on('data', (chunk) => {
            data += chunk;
        });

        // Handle the end of the response
        res.on('end', () => {
            if (res.statusCode === 200) {
                let scrollData = JSON.parse(data);
                console.log('Data received from API:', scrollData);
                if (scrollData.data != null) {
                    console.log('data present');
                    GetSCrollData.GetSCrollData(JSON.parse(scrollData.data));
                } else {
                    console.log('data absent');

                }
            } else {
                console.error(`Failed to fetch data. Status Code: ${res.statusCode}`);
            }
        });
    });

    // Handle any errors with the request
    req.on('error', (e) => {
        console.error(`Request error: ${e.message}`);
    });

    // End the request
    req.end();
}


cron.schedule('06 00 * * *', () => {
    console.log('Running cron job: Fetching data from API at 9 PM');
    fetchDataFromAPI(deptCode, scrollDate); // You can update scrollDate dynamically if needed
}, {
    scheduled: true,
    timezone: "Asia/Kolkata" // Adjust timezone if needed
});

console.log('Cron job scheduled to fetch data daily at 12:06 AM.');



//---------------------------------cron for raise-query----------------------------

async function checkApplicationStatuses() {
    LOG('checkApplicationStatuses ==============================>')
    try {
        const today = new Date();

        // Fetch the max ID for each obj_id where wf_step_transition_id = 171
        const maxIds = await WorkflowExecutionLog.findAll({
            attributes: [
                [Sequelize.fn('MAX', Sequelize.col('id')), 'maxId'],
                'obj_id'
            ],
            where: {
                wf_step_transition_id: 171
            },
            group: ['obj_id'],
            raw: true
        });
        console.log('maxIds:', maxIds);

        const maxobj_IdMap = maxIds.map(entry => entry.obj_id);
        console.log('maxobj_IdMap:', maxobj_IdMap);
        // Fetch all the max id with respect to obj_id

        const maxIdMap = await WorkflowExecutionLog.findOne({
            attributes: ['id'],
            where: {
                obj_id: { [Op.in]: maxobj_IdMap },
            },
            order: [['id', 'DESC']],
            raw: true
        });
        console.log(maxIdMap, 'maxIdMap');

        //   const maxIdsMap = maxIdMap.map(entry => entry.id);
        //   console.log(maxIdsMap,'maxIdsMap');
        // Fetch all the latest records by maxId
        const applications = await WorkflowExecutionLog.findAll({
            attributes: ['id', 'obj_id', 'to_id', 'created_on', 'raise_query'],
            where: {
                id: maxIdMap.id,
                raise_query: { [Op.in]: [1, 2] }
            },
            raw: true
        });
        console.log('applications:', applications);
        if (applications.length > 0) {
            for (const app of applications) {
                const { id, obj_id, to_id, created_on, raise_query } = app;

                // Fetch holidays between created_on and today
                const holidays = await Holidays.count({
                    where: {
                        hol_date: {
                            [Op.between]: [created_on, today]
                        }
                    }
                });

                console.log(holidays, 'count holidays');

                // Calculate total business days
                const totalDays = Math.floor((today - new Date(created_on)) / (1000 * 60 * 60 * 24)); // Total days between dates
                const businessDays = totalDays - holidays;

                console.log(totalDays, businessDays, 'Calculation of Days');

                const updatedStep = await WorkflowExecutionLog.findOne({
                    attributes: ['wf_step_transition_id', 'from_id', 'to_id', 'created_by'],
                    where: { id: id, obj_id: obj_id },
                    raw: true,
                });

                // Check conditions and prevent duplicate log creation
                if (raise_query === 1 && businessDays > 60) {
                    console.log(`Application ID ${obj_id} has exceeded the 60 days time.`);

                    const existingLog = await WorkflowExecutionLog.findOne({
                        where: {
                            obj_id: obj_id,
                            remarks: "Exceeded the given time period",
                        },
                        order: [['id', 'DESC']], // Order by `id` in descending order
                        raw: true // Ensure raw data is returned as plain JSON
                    });



                    console.log('Existing log for raise_query === 1:', existingLog);

                    if (!existingLog) {
                        let maxlogId = await WorkflowExecutionLog.max('id');
                        maxlogId = isNaN(maxlogId) ? 1 : maxlogId + 1;

                        await WorkflowExecutionLog.create({
                            id: maxlogId,
                            obj_id: obj_id,
                            wf_id: '11',
                            wf_step_id: '47',
                            wf_step_transition_id: '170',
                            from_id: updatedStep.to_id,
                            to_id: '9',
                            remarks: "Exceeded the given time period",
                            allocation_file: "null",
                            wac_date: null,
                            created_by: '9',
                            created_on: new Date(),
                            raise_query: null
                        });

                        // Update the Application status
                        await Application.update(
                            {
                                status_id: '3',
                                work_flow_step_transiton_type_mst_id: '4',
                                status_remarks: 'REVIEW'
                            },
                            { where: { id: obj_id } }
                        );
                    }
                } else if (raise_query === 2 && businessDays > 30) {
                    console.log(`Application ID ${obj_id} has exceeded the 30 days time. Going for rejection.`);

                    // Check if a log already exists for this condition
                    const existingLog = await WorkflowExecutionLog.findOne({
                        where: {
                            obj_id: obj_id,
                            remarks: "Application is rejected due to exceeded the given time period ",
                        },
                        order: [['id', 'DESC']], // Order by `id` in descending order
                        raw: true // Ensure raw data is returned as plain JSON
                    });

                    console.log('Existing log for raise_query === 2:', existingLog);
                    if (!existingLog) {
                        let maxlogId = await WorkflowExecutionLog.max('id');
                        maxlogId = isNaN(maxlogId) ? 1 : maxlogId + 1;

                        await WorkflowExecutionLog.create({
                            id: maxlogId,
                            obj_id: obj_id,
                            wf_id: '11',
                            wf_step_id: '47',
                            wf_step_transition_id: '174',
                            from_id: '9',
                            to_id: updatedStep.to_id,
                            remarks: "Application is rejected due to exceeded the given time period ",
                            allocation_file: "null",
                            wac_date: null,
                            created_by: '9',
                            created_on: new Date(),
                            raise_query: null
                        });

                        // Update the Application status
                        await Application.update(
                            {
                                status_id: '6',
                                work_flow_step_transiton_type_mst_id: '3',
                                status_remarks: 'REJECT'
                            },
                            { where: { id: obj_id } }
                        );
                    }
                } else {
                    console.log(`Application ID ${obj_id} is within the allowed time frame.`);
                }
            }
        } else {
            console.log(`Application ID is forwarded within the allowed time frame.`);
        }
    } catch (error) {
        console.error('Error while checking application statuses:', error);
    }
}


console.log('Cron job for checking application statuses has been set up.');

// Schedule the cron job to run daily at midnight
cron.schedule('06 00 * * *', async () => {
    console.log('Running daily application status check...');
    await checkApplicationStatuses();
});



//---------------------------------cron for raise-query----------------------------

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'angularApp/index.html'))
});

app.use('/dowr/api', router);
module.exports = {
    router
};
