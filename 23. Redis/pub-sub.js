const redis = require('redis');
const client = redis.createClient({
    host: 'localhost',
    port: 6379
})

// event listener
client.on('error', (error) => 
    console.log('Redis client error', error)
);

async function testAdditionalFeature() {
    try {
        await client.connect();
        console.log('Connnected to Redis');

        // const subscriber = client.duplicate();      //create new client who shares same connection
        // await subscriber.connect();     //connect to redis server to subscriber

        // await subscriber.subscribe('dummy-channel', (message, channel) => {
        //     console.log(`Received message from ${channel}: ${message}`);
        // });

        // publish message to dummy channel
        // await client.publish('dummy-channel', 'dummy data from publisher');
        // await client.publish('dummy-channel', 'new message from publisher');

        // await new Promise((resolve) => setTimeout(resolve, 3000));
        // await subscriber.unsubscribe('dummy-channel');
        // await subscriber.quit();    //close subscriber connection


        // pipelining and transactions
        // const multi = client.multi();
        // multi.set('key-transaction1', 'value1');
        // multi.set('key-transaction2', 'value2');
        // multi.get('key-transaction1')
        // multi.get('key-transaction2')

        // const results = await multi.exec();
        // console.log(results);

        // const pipeline = client.multi();
        // multi.set('key-pipeline1', 'value1');
        // multi.set('key-pipeline2', 'value2');
        // multi.get('key-pipeline1')
        // multi.get('key-pipeline2')

        // const pipelineResults = await multi.exec();
        // console.log(pipelineResults);


        // // batch data operations
        // const pipelineOne = client.multi();
        // for(let i=0; i<1000; i++) {
        //     pipeline.set(`user:${i}:action`, `Action ${i}`)
        // }
        // await pipelineOne.exec();

        // const dummyExample = client.multi();
        // multi.decrBy('account:1234:balance', 100);
        // multi.incrBy('account:1234:balance', 100);
        // const finalResults = await multi.exec();

        // const cardExample = client.multi();
        // multi.hIncrBy('cart:1234', 'item_count', 1);
        // multi.hIncrBy('cart:1234', 'total_price', 10);

        // await multi.exec();

        console.log('Performance test');
        console.time('without pipeline');

        for(let i=0; i<1000; i++) {
            await client.set(`user${i}`, `user_value${i}`);
        }
        console.timeEnd('without pipeline');
        
        console.time('with pipeline');
        const bigPipeline = client.multi();
        for(let i=0; i<1000; i++) {
            bigPipeline.set(`user_pipeline_key${i}`, `user_pipeline_value${i}`);
        }
        await bigPipeline.exec();

        console.timeEnd('with pipeline');

    } catch (error) {
        console.error(error);
    } finally {
        client.quit();
    }
}

testAdditionalFeature();