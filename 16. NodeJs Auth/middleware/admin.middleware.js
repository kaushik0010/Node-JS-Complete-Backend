
const isAdminUser = (req, res, next) => {
    if(req.userInfo.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied! You need to be admin to access this page'
        })
    }

    next();
}

module.exports = isAdminUser;