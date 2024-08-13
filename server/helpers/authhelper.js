import bcrypt from 'bcrypt'

//firstly we hash the password
export const hashPassword = async(password)  =>{
    try{
        const saltRounds=10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword;
    }
    catch(error){
        console.log(error)
        //show whatever error is occuring
    }
};

//now we compare hash password with actual password decrypt 
//compare password entered by the user with actual 
export const comparePassword= async (password, hashedPassword)=> {
    return bcrypt.compare(password, hashedPassword);
    
}