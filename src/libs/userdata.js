import User from "@/models/User";
import { connectdb } from "./utils"

export const users = [
    {
      name: 'Sai Eain Khant',
      email: 'saieainkhant@gmail.com',
      phone: '09423685350',
      password: '1234',
      isAdmin: true,
    },
    {
      name: 'Aung Kyaw Moe',
      email: 'aungkyawmoe@gmail.com',
      phone: '09542176321',
      password: '5678',
      isAdmin: false,
    },
    {
      name: 'Thiri Win',
      email: 'thiriwin@gmail.com',
      phone: '09452098435',
      password: 'abcd',
      isAdmin: false,
    },
    {
      name: 'Nyein Chan Aye',
      email: 'nyeinchanaye@gmail.com',
      phone: '09457681239',
      password: 'efgh',
      isAdmin: false,
    },
    {
      name: 'Htet Myat Ko',
      email: 'htetmyatko@gmail.com',
      phone: '09543871625',
      password: 'ijkl',
      isAdmin: false,
    },
    {
      name: 'Moe Yan Naing',
      email: 'moeyannaing@gmail.com',
      phone: '09456782341',
      password: 'mnop',
      isAdmin: false,
    },
    {
      name: 'Win Aung',
      email: 'winaung@gmail.com',
      phone: '09456271389',
      password: 'qrst',
      isAdmin: false,
    },
    {
      name: 'Zaw Myint Oo',
      email: 'zawmyintoo@gmail.com',
      phone: '09456231876',
      password: 'uvwx',
      isAdmin: false,
    },
    {
      name: 'Phyo Wai Aung',
      email: 'phyowaiaung@gmail.com',
      phone: '09542317865',
      password: 'yzab',
      isAdmin: false,
    },
    {
      name: 'Thet Htar Wai',
      email: 'thethtarwai@gmail.com',
      phone: '09457892134',
      password: 'cdef',
      isAdmin: false,
    },
  ]

export async function seedUsers(){
    try {
      await connectdb();
      const result = await User.deleteMany();
      console.log("I am finished delete many",result)
      await User.create(users);
      console.log("User data seeding is completed")
    } catch (error) {
      console.log(error.message);
    }
}