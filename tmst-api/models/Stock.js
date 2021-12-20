const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StockSchema = new Schema(
    {
        UDI: { type: String },
        MaterialId: { type: Schema.Types.ObjectId, required: true },
        Quantity: { type: String, required: true },
        SKT: { type: String, required: true },
        CreatedAt: { type: Date, default: Date.now },
        WarehouseId: { type: Schema.Types.ObjectId, required: true }

    }
)

module.exports = mongoose.model('Stock', StockSchema);
