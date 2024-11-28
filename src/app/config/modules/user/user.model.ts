import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../..";
import bcrypt from 'bcrypt';



const userSchema = new Schema<TUser>({
    id: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    needsPasswordChange : {
        type: Boolean,
        default : true,
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
   user.password = await bcrypt.hash(user.password, Number(config.bycript_salt_round));
   next();
})


//set after password
userSchema.post('save', function(doc,next){
  doc.password = '';
   next();
})


export const User = model<TUser>('User',userSchema);
