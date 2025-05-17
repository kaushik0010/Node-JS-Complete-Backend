const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kaushik010:dA7xRqQ3oFjo2a95@cluster0.ej1w4p8.mongodb.net/')
.then(() => {
    console.log(`database connected successfully`);
})
.catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: {type: Date, default: Date.now}
});


// user model
const User = mongoose.model('User', userSchema);

async function runQueryExample() {
    try {
        // const newUser = await User.create({
        //     name: 'Kaushik Paykoli',
        //     email: 'kaushik@mail.com',
        //     age: '40',
        //     isActive: true,
        //     tags: ['developer', 'explorer'],
        // })

        // console.log("new user created successfully:", newUser);

        // const newUser = new User({
        //     name: 'John Doe',
        //     email: 'johndoe@mail.com',
        //     age: '55',
        //     isActive: false,
        //     tags: ['developer', 'explorer', 'designer'],
        // })

        // await newUser.save();

        // console.log("new user created successfully:", newUser);

        // const allUsers = await User.find({});
        // console.log(allUsers);

        // const getUserNotActive = await User.find({isActive: false});
        // console.log(getUserNotActive);


        // const getUser = await User.findOne({name: 'User 2'});
        // console.log(getUser);

        // const getLatestUserById = await User.findById(newUser._id);
        // console.log(getLatestUserById);

        // const selectedField = await User.find().select('name email _id');
        // console.log(selectedField);

        const limitedUsers = await User.find().limit(5).skip(1);
        console.log(limitedUsers);

        // const sortedUsers = await User.find().sort({age: 1});
        // console.log(sortedUsers);

        // const countDocuments = await User.countDocuments({ isActive: true });
        // console.log(countDocuments);

        // const deleteUser = await User.deleteOne({ age: 55 });
        // console.log(deleteUser);

        // const updatedUser = await User.findByIdAndUpdate(newUser._id, {
        //     $set: {age: 100},
        //     $push: {tags: 'updated'}
        // }, {new: true});
        // console.log(updatedUser);

    } catch (e) {
        console.log('Error:', e);
    } finally {
        await mongoose.connection.close();
    }
}

runQueryExample();