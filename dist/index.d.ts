import { interfaces } from './model';
import userDataType = interfaces.userDataType;
export default class PasswordLessWordPress {
    passwordLessService: any;
    token?: string;
    user: any;
    constructor(siteId: string, PasswordLess?: any, UserBuilder?: any);
    initialize(): Promise<void>;
    createUserData(userData: userDataType): any;
    getSignInURL(wordpressUrl: string, userData: userDataType): Promise<any>;
}
