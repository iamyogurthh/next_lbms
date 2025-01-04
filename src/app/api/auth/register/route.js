import { connectdb, getDataFromForm } from "@/libs/utils";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const formdata = await request.formData();
        const { username, email, phone, password } = getDataFromForm(formdata, "username", "email", "phone", "password");
        console.log(username, email, phone, password)
        if (!username || !email || !phone || !password) {
            return NextResponse.json({ message: "Reqired all fields" }, { status: 400 });
        }
        await connectdb();
        const user = await User.findOne({ email: email });
        if (user) {
            return NextResponse.json({ message: "User with this email is already exist" }, { status: 400 });
        }
        const newUser = await User.create({
            username,
            email,
            phone,
            password,
        });
        return NextResponse.json({ username, email, phone }, { status: 200 });
    } catch (error) {
        console.log(error.message)
    }
}