/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { UserEntity } from '../models/UserEntity';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static createUser(
        requestBody: CreateUserDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param authorization Bearer token
     * @returns UserEntity
     * @throws ApiError
     */
    public static getUser(
        authorization?: string,
    ): CancelablePromise<UserEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param email
     * @param authorization Bearer token
     * @returns UserEntity
     * @throws ApiError
     */
    public static userControllerFindByEmail(
        email: string,
        authorization?: string,
    ): CancelablePromise<UserEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/email/{email}',
            path: {
                'email': email,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }

}
