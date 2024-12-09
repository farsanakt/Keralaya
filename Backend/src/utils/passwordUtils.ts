import bcrpt from 'bcryptjs'

export async function hashpassword(password:string):Promise<string>{

    return await bcrpt.hash(password,10)

}

export async function comparePassword(password:string,hashedpassword:string):Promise<boolean>{

    return await bcrpt.compare(password,hashedpassword)

}