import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    author : String,
    genre : String,
    description : String,
    overview : String,
    coverImage : {
        type : String,
        default : '/default.png',
    },
    qty : {
        type : Number,
        required : true,
    }
})


const Book = mongoose.models.Book || mongoose.model("Book",bookSchema);

export default Book;