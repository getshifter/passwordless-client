import { interfaces } from '../model';
import wpRole = interfaces.wpRole;
declare class WPUserBuilder {
    private token?;
    private role;
    private username?;
    private email?;
    constructor();
    setToken(token: string): this;
    setUsername(username: string): this;
    setEmail(email: string): this;
    setRole(role: wpRole): this;
    getQuery(wordpressUrl: string): string;
}
export default WPUserBuilder;
