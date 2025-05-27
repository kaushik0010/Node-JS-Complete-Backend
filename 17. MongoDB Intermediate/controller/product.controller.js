const Product = require('../model/Product');


const getProductStats = async(req, res) => {
    try {
        const result = await Product.aggregate([
            // stage 1
            {
                $match: {
                    inStock: true,
                    price: {
                        $gte: 100
                    }
                }
            },
            // stage 2: group documents
            {
                $group: {
                    _id: "$category",
                    avgPrice: {
                        $avg: "$price"
                    },
                    count: {
                        $sum: 1
                    }
                }
            }

        ]);

        res.status(200).json({
            success: true,
            data: result,
        })


    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

const getProductAnalysis = async(req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $match: {
                    category: 'Accessories'
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "price"
                    },
                    averagePrice: {
                        $avg: "price"
                    },
                    maxProductPrice: {
                        $max: "price"
                    },
                    minProductPrice: {
                        $min: "price"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                    averagePrice: 1,
                    maxProductPrice: 1,
                    minProductPrice: 1,
                    priceRange: {
                        $subtract: ["$maxProductPrice", "$minProductPrice"],
                    },
                }
            }
        ])
        res.status(200).json({
            success: true,
            data: result,
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

const insertSampleProducts = async(req, res) => {
    try {
        const sampleProducts = [
            {
                "name": "Wireless Mouse",
                "category": "Electronics",
                "price": 25.99,
                "inStock": true,
                "tags": ["computer", "accessory", "tech"]
            },
            {
                "name": "Bluetooth Speaker",
                "category": "Audio",
                "price": 49.95,
                "inStock": false,
                "tags": ["music", "tech", "portable"]
            },
            {
                "name": "LED Monitor 24 inch",
                "category": "Computers",
                "price": 149.99,
                "inStock": true,
                "tags": ["display", "computer", "tech"]
            },
            {
                "name": "Gaming Keyboard",
                "category": "Accessories",
                "price": 89.5,
                "inStock": true,
                "tags": ["gaming", "keyboard", "tech"]
            },
            {
                "name": "External Hard Drive 1TB",
                "category": "Storage",
                "price": 64.25,
                "inStock": false,
                "tags": ["storage", "backup", "tech"]
            },
            {
                "name": "Noise Cancelling Headphones",
                "category": "Audio",
                "price": 199.99,
                "inStock": true,
                "tags": ["audio", "music", "tech"]
            },
            {
                "name": "Smartphone Stand",
                "category": "Accessories",
                "price": 12.49,
                "inStock": true,
                "tags": ["phone", "stand", "tech"]
            },
            {
                "name": "4K Web Camera",
                "category": "Computers",
                "price": 79.99,
                "inStock": false,
                "tags": ["camera", "streaming", "tech"]
            },
            {
                "name": "Laptop Backpack",
                "category": "Bags",
                "price": 39.99,
                "inStock": true,
                "tags": ["laptop", "travel", "tech"]
            },
            {
                "name": "USB-C Hub",
                "category": "Accessories",
                "price": 29.95,
                "inStock": true,
                "tags": ["usb", "hub", "tech"]
            }
        ]

        const result = await Product.insertMany(sampleProducts);
        res.status(201).json({
            success: true,
            data: `Inserted ${result.length} sample products`,
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

module.exports = {
    insertSampleProducts,
    getProductStats,
    getProductAnalysis
}