import mongoose from 'mongoose'
import { writeFile } from 'fs/promises'
import fs from 'fs'
import path from 'path'
export async function connectdb() {
  try {
    console.log(process.env.MONGO_URL)

    await mongoose.connect(process.env.MONGO_URL)
    console.log('Database is connected')
  } catch (error) {
    console.log(error.message)
  }
}

export function getDataFromForm(formData, ...args) {
    let data = {};
    console.log("I am in the function");
    for (let i = 0; i < args.length; i++) {
        data[args[i]] = formData.get(args[i]);
    }
    return data;
}


export async function handleImage(coverImage){
  console.log("I am in the handle image",coverImage);
  const buffer = Buffer.from(await coverImage.arrayBuffer());
  const filename = Date.now() + coverImage.name.replaceAll(" ", "_");
  await writeFile(path.join(process.cwd(), "public/bookImages/", filename), buffer);
  return filename;
}

export function deleteCoverImage(coverImage){
  fs.unlink(path.join(process.cwd(),'public',coverImage),()=>{});
}

export function formatDate(dateInput) {
  const date = new Date(dateInput)
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`
}