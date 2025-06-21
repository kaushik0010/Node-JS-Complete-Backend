require('dotenv').config();
const express = require('express');
const {configureCors} = require('./config/cors.config');
const { requestLogger, addTimeStamp } = require('./middleware/customMiddleware');
const {globalErrorHandler} = require('./middleware/errorHandler')
const {urlVersion} = require('./middleware/apiVersion')
const {createRateLimiter} = require('./middleware/rateLimiting')
const itemRoutes = require('./routes/item.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(createRateLimiter(20, 15*60*1000));
app.use(express.json());

app.use(urlVersion('v1'));
app.use('/api/v1', itemRoutes);

app.use(globalErrorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});