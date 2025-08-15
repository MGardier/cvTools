export interface ApiErrorsInterface {
    success: boolean,
    statusCode: number,
    timestamp: Date,
    path: string,
    message: string
}