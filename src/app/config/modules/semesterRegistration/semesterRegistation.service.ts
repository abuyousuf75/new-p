import AppError from '../../erroes/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import httpStatus from 'http-status-codes';
import { SemesterRegistation } from './semsesterRegistration.model';
import QueryBuilders from '../../builder/QueryBilder';
import { RegistationStatus } from './semesterRegistation.constant';

const createSemesterRegistationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  // check if there any register samester that is alredy upcoming | ongonin

  const isThereAnyUpcomingorOngoiningSemester =
    await SemesterRegistation.findOne({
      $or: [
        { status: RegistationStatus.ONGOING },
        { status: RegistationStatus.UPCOMING },
      ],
    });

  if (isThereAnyUpcomingorOngoiningSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is alredy an ${isThereAnyUpcomingorOngoiningSemester.status} resigterd semester!`
    );
  }

  // if the academic semsetr exsist
  const isAcademicSemesterExsist = await AcademicSemester.findById(
    academicSemester
  );
  if (!isAcademicSemesterExsist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
  }
  const isSemesterAlreadyExsist = await SemesterRegistation.findOne({
    academicSemester,
  });

  if (isSemesterAlreadyExsist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This academic semster alredy exsist!'
    );
  }

  const result = await SemesterRegistation.create(payload);
  return result;
};

const getAllAcademicSemesterIntoDB = async (
  payload: Record<string, unknown>
) => {
  const semesterRegistationQuery = new QueryBuilders(
    SemesterRegistation.find().populate('academicSemester'),
    payload
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistationQuery.modelQuery;

  return result;
};

const getSingleAcademicSemsterFromDB = async (id: string) => {
  const result = await SemesterRegistation.findById(id);
  return result;
};
const UpdateSingleAcademicSemsterFromDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {

  // check if the requested registered semester is exists
  // check if the semester is already registered!
  const isSemesterRegistrationExists = await SemesterRegistation.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found !');
  }

  //if the requested semester registration is ended , we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === RegistationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`
    );
  }

  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === RegistationStatus.UPCOMING &&
    requestedStatus === RegistationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`
    );
  }

  if (
    currentSemesterStatus === RegistationStatus.ONGOING &&
    requestedStatus === RegistationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`
    );
  }

  const result = await SemesterRegistation.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemesterRegistationService = {
  createSemesterRegistationIntoDB,
  getAllAcademicSemesterIntoDB,
  getSingleAcademicSemsterFromDB,
  UpdateSingleAcademicSemsterFromDB,
};
