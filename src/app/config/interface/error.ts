type TErrorSources = {
  path: string | number;
  message: string;
}[];

export default TErrorSources;


export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
