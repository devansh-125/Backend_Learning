const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promises.resolve(requestHandler(req,res,next)).catch((err) => {
            next(err)
        })
    }

}