import { isValidObjectId } from "mongoose";
export default function isValidMongoId(req, res, next) {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "wrong moongo Id is provided" });
    }
    next();
}
//# sourceMappingURL=isValidMongoId.middleware.js.map