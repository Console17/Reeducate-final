export default function isAdminMiddleware(req, res, next) {
    if (req.userRole !== "admin") {
        return res.status(403).json({ message: "permition denied" });
    }
    next();
}
//# sourceMappingURL=isAdmin.middleware.js.map