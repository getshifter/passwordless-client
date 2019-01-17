export declare namespace interfaces {
    type S3ConfigType = {
        customPrefix?: {
            public?: string;
            protected?: string;
            private?: string;
        };
    };
    type wpRole = 'administrator';
    type SHOULD_CREATE_USER = 'create_new';
    type ERROR_USER_NOT_FOUND = 'not_found';
    type userDataType = {
        username: string;
        email: string;
        role?: wpRole | '';
    };
}
