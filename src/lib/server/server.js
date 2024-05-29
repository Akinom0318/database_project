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
    }
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

// @ts-ignore
//find certain cart item using ID
export async function check_cart_item_db(user_ID,product_ID_input){
  return await prisma.cart_item.findFirst({
    // @ts-ignore
    where:{
      cart_ID: user_ID,
      product_ID: product_ID_input,
    }
  })
}


// @ts-ignore
//update or create cart item
export async function add_to_card_db(user_ID,product_ID_input,quantity_input,price_input){
  let tmp_cart_item = await check_cart_item_db(user_ID,product_ID_input);

  if(tmp_cart_item){
      let origin_quantity = tmp_cart_item?.quantity;
      let origin_price = tmp_cart_item?.prices;
      await prisma.cart_item.update({
      // @ts-ignore
      where: {
        cart_ID_product_ID:{
          cart_ID:user_ID,
          product_ID:product_ID_input
        }
      },
      data: {
        quantity: Number(origin_quantity) + Number(quantity_input),
        prices: Number(origin_price) + Number(price_input)
      }
    })
  }else{
    await prisma.cart_item.create({
      // @ts-ignore
      data:{
        cart_ID: user_ID,
        product_ID: product_ID_input,
        quantity: quantity_input,
        prices: price_input
      }
    })
  }
}
//TODO update products