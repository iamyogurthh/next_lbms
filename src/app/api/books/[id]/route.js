import Book from "@/models/Book";
import connectdb from "@/libs/connectdb"
import { NextResponse } from "next/server";

export async function GET(request,{ params }) {
    try {
        await connectdb();
        const { id } = await params;
        const book = await Book.find({"_id" : id});
        if (book) {
            return NextResponse.json(book, { status: 200 });
        }
        return NextResponse.json({ "message": "No Book is found" })
    } catch (error) {
        console.log(error.message)
    }
}