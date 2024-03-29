/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchSheetMusicEntity } from '../models/PatchSheetMusicEntity';
import type { SheetMusicDocumentEntity } from '../models/SheetMusicDocumentEntity';
import type { SheetMusicPageEntity } from '../models/SheetMusicPageEntity';
import type { UploadFileDto } from '../models/UploadFileDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SheetMusicService {

    /**
     * @param formData
     * @param authorization Bearer token
     * @returns void
     * @throws ApiError
     */
    public static upload(
        formData: UploadFileDto,
        authorization?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sheet-music/upload',
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
     * @param sheetMusicId
     * @param authorization Bearer token
     * @returns SheetMusicPageEntity List of all sheet music urls
     * @throws ApiError
     */
    public static getPagesForSheetMusic(
        sheetMusicId: number,
        authorization?: string,
    ): CancelablePromise<Array<SheetMusicPageEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sheet-music/{sheetMusicId}/pages',
            path: {
                'sheetMusicId': sheetMusicId,
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
     * @returns SheetMusicDocumentEntity List of all sheet music urls
     * @throws ApiError
     */
    public static getAllSheetMusic(
        authorization?: string,
    ): CancelablePromise<Array<SheetMusicDocumentEntity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sheet-music',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param requestBody
     * @param authorization Bearer token
     * @returns SheetMusicDocumentEntity
     * @throws ApiError
     */
    public static updateSheetMusic(
        requestBody: PatchSheetMusicEntity,
        authorization?: string,
    ): CancelablePromise<SheetMusicDocumentEntity> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/sheet-music/{id}',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

}
