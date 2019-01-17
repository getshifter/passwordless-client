import {interfaces} from './model'
export const defaultS3Conf:interfaces.S3ConfigType = {
  customPrefix: {
    public: '',
    protected: '/',
    private: '/',
  },
};

export const SHOULD_CREATE_USER: interfaces.SHOULD_CREATE_USER = 'create_new';
export const ERROR_USER_NOT_FOUND: interfaces.ERROR_USER_NOT_FOUND = 'not_found';