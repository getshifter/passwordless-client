export namespace interfaces {
  export type S3ConfigType = {
    customPrefix?: {
      public?: string,
      protected?: string,
      private?: string,
    },
  };
  export type wpRole = 'administrator';
  export type SHOULD_CREATE_USER = 'create_new';
  export type ERROR_USER_NOT_FOUND = 'not_found';
  export type userDataType = {
    username: string,
    email: string,
    role?: wpRole | '',
  };
}