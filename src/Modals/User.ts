import mongoose from 'mongoose';
import { PasswordManager } from '../services/passwordManager';


// interfae which describe property user can have 
interface UserAttrs{
    email:string,
    password:String
}

//  interface which defines property of userModel 
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs:UserAttrs):UserDoc;
}

// interface which defines property of User Doc
interface UserDoc extends mongoose.Document{
    email:string,
    password:string
}


// user schema 
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,


    }
},{
    toJSON:{
        transform(doc,ret)
        {
            ret.id=ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save',async function(done){
    if(this.isModified('password')){
        const hashed=await PasswordManager.toHash(this.get('password'));
        this.set('password',hashed);
    }

    done();
})

// adding a static function build to create User according to our need 
userSchema.statics.build=(attrs:UserAttrs)=>{
  return new User(attrs);
}

const User=mongoose.model<UserDoc,UserModel>('User',userSchema);

export {User};