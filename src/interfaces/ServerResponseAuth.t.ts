import type { ResponseStatus } from 'src/enum/EServerResponseStatus';
import type { Token } from './IToken.t';
import type { User } from './IUser';

export interface ServerResponseAuthSuccess {
  status: ResponseStatus.SUCCESS;
  user: User;
  token: Token;
}


export interface ServerResponseLogoutSuccess {
  status: ResponseStatus.SUCCESS;
}
