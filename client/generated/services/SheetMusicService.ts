/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SheetMusicService {

    /**
     * @param formData
     * @param contentType
     * @param authorization Bearer token
     * @returns void
     * @throws ApiError
     */
    public static upload(
        formData: {
            file?: Blob;
        },
        contentType?: string,
        authorization?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sheet-music/sheet-music/upload',
            headers: {
                'Content-Type': contentType,
                'Authorization': authorization,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

}
