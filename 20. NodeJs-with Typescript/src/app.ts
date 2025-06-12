import express, {Express, Request, Response, NextFunction} from 'express';
import { IUser, User } from './models/User.model';

const app : Express = express();
const PORT = 3000;

app.use(express.json());

interface CustomReq extends Request {
    startTime?: number
}

// middleware
app.use((req: CustomReq, res: Response, next:NextFunction) => {
    req.startTime = Date.now();
    next();
})

app.get('/', (req: Request, res: Response) => {
    res.send('Hello! TypeScript with Express');
});

interface User {
    name: string,
    email: string
}

app.post('/user', (req: Request<{}, {}, User>, res: Response) => {
    const {name, email} = req.body;
    res.json({
        message: `User created ${name}-${email}`
    });
});

// get users by id
app.get('/users/:id', (req: Request<{id: string}>, res: Response) => {
    const {id} = req.params;
    res.json({
        userID: id,
    });
});

app.get('/users', async(req: Request, res: Response) => {
    try {
        const user: IUser[] = await User.find({});

    } catch (e) {
        res.status(400).json({
            message: 'Something went wrong!'
        })
    }
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});