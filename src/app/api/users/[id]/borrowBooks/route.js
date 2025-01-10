import { connectdb, getDataFromForm } from "@/libs/utils"
import Book from "@/models/Book";
import BorrowReturnRecord, { addBooksToBorrowReturnRecord } from "@/models/BorrowReturnRecord";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id: email } = await params;
        await connectdb();
        const borrowedBooks = await BorrowReturnRecord.findOne({ 'email': email }).populate({
            path : 'books.bookId',
            model : 'Book',
        });
        if (borrowedBooks) {
            return NextResponse.json(borrowedBooks, { status: 200 });
        }
        return NextResponse.json({ "message": "No book found" }, { status: 200 })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: "An error occurred while processing the request." }, { status: 500 });

    }
}

export async function POST(request, { params }) {
    try {
        const { id: email } = await params;
        const { books } = await request.json();
        console.log("books in frontends is ", books);
        await connectdb();
        const borrowRecord = await addBooksToBorrowReturnRecord(email, books);
        return NextResponse.json(borrowRecord, { status: 200 })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: "User or Book is invalid" }, { status: 400 })
    }
}