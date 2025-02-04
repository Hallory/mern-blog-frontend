import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization.split(' ')[1]);
    if(token){
        try {
            const decoded = jwt.verify(token,'secret123');

            req.userId = decoded._id

            next()
        } catch (error) {
            return res.status(403).json({ message: 'Have no access' })
        }
    }else{
        return res.status(403).json({ message: 'Have no access' })
    }
}