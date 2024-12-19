import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../..";
import bcrypt from 'bcrypt';



const userSchema = new Schema<TUser,UserModel>({
    id: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    needsPasswordChange : {
        type: Boolean,
        default : true,
    },
    passwordChangedAt : {
        type : Date,
    },
    role : {
        type : String,
        enum : ['student', 'faculty','admin'],
    },
    status : {
        type : String,
        enum : ['in-progress','blocked'],
        default: 'in-progress'
    },
    isDeleted : {
        type : Boolean,
        default: false,
    }
},

{
    timestamps: true,
}
);



userSchema.pre('save',async function(next){
  const user = this; 
  console.log(user.password)
   user.password = await bcrypt.hash(user.password, Number(config.bycript_salt_round));

   next();
})



//set after password
userSchema.post('save', function(doc,next){
  doc.password = '';
   next();
})


userSchema.statics.isUserExsistByCustomId = async function (id:string){
    return await User.findOne({id}).select('+password')
}

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hasedPassword
) {
  return await bcrypt.compare(plainTextPassword, hasedPassword);
};


userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
    console.log(passwordChangedTime, jwtIssuedTimestamp)
  return passwordChangedTime > jwtIssuedTimestamp;
};


export const User = model<TUser, UserModel>('User', userSchema);


