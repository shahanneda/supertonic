/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { RecordingEntity } from '../models/RecordingEntity';
import type { UploadRecording } from '../models/UploadRecording';
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
            url: '/user',
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
            url: '/user',
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
    public static getUserByEmail(
        email: string,
        authorization?: string,
    ): CancelablePromise<UserEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/email/{email}',
            path: {
                'email': email,
            },
            headers: {
                'Authorization': authorization,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param authorization Bearer token
     * @returns UserEntity
     * @throws ApiError
     */
    public static getAllUsers(
        authorization?: string,
    ): CancelablePromise<Array<UserEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/user/all',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param id
     * @returns RecordingEntity
     * @throws ApiError
     */
    public static getAllRecordings(
        id: number,
    ): CancelablePromise<Array<RecordingEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{id}/recordings',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param formData
     * @param authorization Bearer token
     * @returns void
     * @throws ApiError
     */
    public static upload(
        formData: UploadRecording,
        authorization?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/recordings/upload',
            headers: {
                'Authorization': authorization,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param id
     * @returns boolean
     * @throws ApiError
     */
    public static deleteRecording(
        id: number,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/recording/delete/{id}',
            path: {
                'id': id,
            },
        });
    }

}
