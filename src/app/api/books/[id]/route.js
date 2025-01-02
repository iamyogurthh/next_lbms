import { connectdb, deleteCoverImage, getDataFromForm, handleImage } from "@/libs/utils";
import Book from "@/models/Book";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    try {
        await connectdb();
        const { id } = await params;
        const book = await Book.find({ "_id": id });
        if (book) {
            return NextResponse.json(book, { status: 200 });
        }
        return NextResponse.json({ "message": "No Book is found" })
    } catch (error) {
        console.log(error.message)
    }
}

export async function PUT(request, { params }) {
    try {
        await connectdb();
        const { id } = await params;
        const formdata = await request.formData();
        const book = await Book.findById(id);
        if (book) {
            const { title, qty, description, author, overview, genre, coverImage } = getDataFromForm(formdata, "title", "qty", "description", "author", "overview", "genre", "coverImage");
            console.log("cover image in put is ",coverImage)
            if(`/bookImages/${coverImage}` === coverImage || '/defaultIcons/book_place_holder.png' === coverImage) {
                console.log("I am entering eqaul state")
                book.title = title;
                book.qty = qty;
                book.description = description;
                book.author = author;
                book.overview = overview;
                book.genre = genre;
                await book.save();
                return NextResponse.json(book, { status: 200 });
            }
            if (!coverImage || coverImage === null) {
                console.log("I am entering put null")
                book.coverImage = `/defaultIcons/book_place_holder.png`;
                book.title = title;
                book.qty = qty;
                book.description = description;
                book.author = author;
                book.overview = overview;
                book.genre = genre;
                await book.save();
                return NextResponse.json(book, { status: 200 });
            }
            const filename = await handleImage(coverImage);
            deleteCoverImage(book.coverImage);
            console.log("i am entering delete cover and update")
            book.coverImage = `/bookImages/${filename}`;
            book.title = title;
            book.qty = qty;
            book.description = description;
            book.author = author;
            book.overview = overview;
            book.genre = genre;
            await book.save();
            return NextResponse.json(book, { status: 200 });
        }
        return NextResponse.json({ "message": "No book is found" }, { status: 404 });
    } catch (error) {
        console.log(error.message);
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const book = await Book.findById(id);
        if (book) {
            if (book.coverImage !== '/defaultIcons/book_place_holder.png') {
                deleteCoverImage(book.coverImage);
                await Book.findByIdAndDelete(id);
                return NextResponse.json({ message: "Deleted Successfully" }, { status: 200 });
            }
            await Book.findByIdAndDelete(id);
            return NextResponse.json({ message: "Deleted Successfully" }, { status: 200 });
        }
        return NextResponse.json({ "message": "Not Found" }, { status: 404 });
    } catch (error) {
        console.log(error.message);
    }
}