import mongoose from "mongoose";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model"
import AppError from "../../erroes/AppError";
import httspStats from 'http-status-codes'
import { User } from "../user/user.model";

const getAllFacaltysFromDB = async(faculty:TFaculty) => {
    const result = await Faculty.find(faculty);
    return result
}

const getSingleFacaltyFromDB = async(id:string) => {
    const result = await Faculty.findOne({id});
    return result
}


const updateAFacaltyFromDB = async(id: string, payload : Partial <TFaculty>) => {
    const { name, ...remaningFacaltyData } = payload;
    
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remaningFacaltyData,
  };

if (name && Object.keys(name).length) {
  for (const [key, value] of Object.entries(name)) {
    modifiedUpdatedData[`name.${key}`] = value;
  }
}

 const result = await Faculty.findOneAndUpdate({id}, modifiedUpdatedData, {
   new: true,
   runValidators: true,
 });
 return result
};

const deleteAFacaltyFromDB = async(id: string) => {

  const session = await mongoose.startSession();

  try{

    session.startTransaction()
     const deletedFacalty = await Faculty.findOneAndUpdate({id}, {isDeleted: true},
     {new:true , session}
     );

     if(!deletedFacalty){
        throw new AppError(httspStats.BAD_GATEWAY,'Failed to deleted facalty')
     }

     // for user

     const deletedUser = await User.findOneAndUpdate({id}, 
      {isDeleted: true},
      {new: true, session}
     )

      if (!deletedUser) {
        throw new AppError(httspStats.BAD_GATEWAY, 'Failed to deleted User');
      }

      // if seccessful 

      //
    await session.commitTransaction();
    await session.endSession();
    return deletedFacalty;

  }
  catch(err){
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httspStats.BAD_GATEWAY,'facalty not deleted')
  }

}



 export const FacaltyService = {
   getAllFacaltysFromDB,
   getSingleFacaltyFromDB,
   updateAFacaltyFromDB,
   deleteAFacaltyFromDB,
 };