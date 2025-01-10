import { connectdb } from "@/libs/utils";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(request){
    try {
        const {id} = await request.json();
        await connectdb();
        await User.findByIdAndDelete(id);
        return NextResponse.json({message : "User deleted successfully"},{status : 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "An error occurred while processing the request." }, { status: 500 });
    }
}