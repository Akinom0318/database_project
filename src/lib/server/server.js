// @ts-ignore

import { PrismaClient } from '@prisma/client';

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


//! Function
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

//update users
// @ts-ignore
//there's a better way to do this but I will hold for it -- Akinom
export async function update_a_user_db(user_account, password_input, address_input, email_address_input, birthdate_input){
  await prisma.user.update({
    where: {
      account: user_account
    },
    data: {
      password: password_input,
      address: address_input,
      email_address: email_address_input,
      birthdate: birthdate_input
    }
  })
}

//TODO update products
