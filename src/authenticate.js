import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from './config';
import { AuthenticationError } from "apollo-server-core";

const authenticate = ({ request }, models) => {
  try {
    console.log()
    if ( !request.headers.authorization ) return undefined;

    const { authorization } = request.headers;
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    return models.User.findOne({username: decoded.username});

  } catch (error) {
    console.log(error);
    throw new AuthenticationError('invalid token');
  }
};

export default authenticate;