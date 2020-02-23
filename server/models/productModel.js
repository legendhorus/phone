var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: String,
    price: Number,
    sale: Number,
    category_id: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    content: String,
    qty: Number,
    supplier_id: [{ type: Schema.Types.ObjectId, ref: 'Supplier' }],
    buyed: Number,
    img_link: String,
    created_at: Date
})

var Product = mongoose.model("Product", productSchema);

module.exports = Product;