// @ts-ignore
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//return all users
export async function get_users_db() {
    const allUsers = await prisma.user.findMany()
    return allUsers;
  }

export async function get_products_db(){
    const allProducts = await prisma.product.findMany()
    return allProducts;
  }

// @ts-ignore
export async function create_new_user_db(account_input, password_input, address_input, email_input, birthdate_input) {
  await prisma.user.create({
    data: {
      account: account_input,
      password: password_input,
      enrollment_date: (new Date(Date.now())).toISOString(),
      address: address_input,
      email_address: email_input,
      birthdate: birthdate_input
    },
  })
}
