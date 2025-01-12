import { connectdb } from "@/libs/utils";
import BorrowReturnRecord from "@/models/BorrowReturnRecord";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        await connectdb();
        const user = await User.findById(id).select('-password');
        if (user) {
            const borrowRecord = await BorrowReturnRecord.findOne({ email: user.email }).select('-_id -email').populate('books.bookId');
            
            if (borrowRecord) {
                borrowRecord.books.sort((a,b)=> new Date(b.borrowDate) - new Date(a.borrowDate));
                return NextResponse.json({ user, borrowBooks: borrowRecord.books }, { status: 200 });
            }
            return NextResponse.json(user, { status: 200 });
        }
        return NextResponse.json({ "message": "User not found" }, { status: 400 });

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: "An error occurred while processing the request." }, { status: 500 });
    }
}
