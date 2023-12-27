const mongoose = require('mongoose');
const mongoDB= async ()=>{
    try {
        await mongoose.connect('mongodb+srv://vtu19691:jay19691@cluster0.shkspqx.mongodb.net/foodDelivery?retryWrites=true&w=majority');
        console.log("Database connected");

        const foodData = mongoose.connection.db.collection("fooditems");
        const data = await foodData.find({}).toArray();
        const foodCategory = mongoose.connection.db.collection("foodCategory");
        const categoryData = await foodCategory.find({}).toArray();
        global.foodCategory = categoryData;
        global.dataItem = data;
        
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}
 module.exports = mongoDB;