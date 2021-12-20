const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StockprocessSchema = new Schema(
    {
        
        StockId: { type: Schema.Types.ObjectId, required: true },
        Quantity: { type: Number, default:0, required: true },
        UserId: { type: Schema.Types.ObjectId, required: true },
        UsingTypeId: { type: String },
        ProcessDate: { type: Date, required: true,default:Date.now }

    }
)

module.exports = mongoose.model('stockprocess', StockprocessSchema);
