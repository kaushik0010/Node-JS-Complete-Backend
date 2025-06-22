const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
})

// event listener
client.on('error', (error) => 
    console.log('Redis client error', error)
);

async function redisDataStructures() {
    try {
        await client.connect();
        console.log('Connnected to Redis');

        // Strings
        await client.set('user:name', 'Kaushik Paykoli');
        const name = await client.get('user:name');
        console.log(name);

        await client.mSet(['user:email', 'abc@gmail.com', 'user:age', '20', 'user:country', 'India']);
        const [email, age, country] = await client.mGet(['user:email', 'user:age', 'user:country']);
        console.log(email, age, country);


        // Lists
        await client.lPush('notes', ['note 1', 'note 2', 'note 3']);
        const extractAllNotes = await client.lRange('notes', 0 , -1);
        console.log(extractAllNotes);

        const firstNote = await client.lPop('notes');
        console.log(firstNote);

        const remainingNotes = await client.lRange('notes', 0, -1);
        console.log(remainingNotes);


        // Sets
        await client.sAdd('user:nickName', ['john', 'varun', 'kai']);
        const extractUserNicknames = await client.sMembers('user:nickName');
        console.log(extractUserNicknames);

        const isUserNicknameThere = await client.sIsMember('user:nickName', 'varun');
        console.log(isUserNicknameThere);

        await client.sRem('user:nickName', 'kai');
        const getUpdatedUserNicknames = await client.sMembers('user:nickName');
        console.log(getUpdatedUserNicknames);


        // Sorted Set
        await client.zAdd('cart', [
            { score: 100, value: 'Cart 1' },
            { score: 50, value: 'Cart 2' },
            { score: 10, value: 'Cart 3' },
        ]);
        const getTopCartItem = await client.zRange('cart', 0, -1);
        console.log(getTopCartItem);

        const extractAllCartItems = await client.zRangeWithScores('cart', 0, -1);
        console.log(extractAllCartItems);

        const CartTwoRank = await client.zRank('cart', 'Cart 2');
        console.log(CartTwoRank);       // output is 1 coz counting starts from 0


        // Hashes
        await client.hSet('product:1', {
            name: 'Product 1',
            description: 'Product 1 desc',
            rating: '5'
        })

        const getProductRating = await client.hGet('product:1', 'rating');
        console.log(getProductRating);

        const getProductDetails = await client.hGetAll('product:1');
        console.log(getProductDetails);

        await client.hDel('product:1', 'rating');
        const getUpdatedDetails = await client.hGetAll('product:1');
        console.log(getUpdatedDetails);

    } catch (error) {
        console.error(error);
    } finally {
        client.quit();
    }
}

redisDataStructures();