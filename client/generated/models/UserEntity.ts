/* tslint:disable */
/* eslint-disable */
/**
 * Cats example
 * The cats API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface UserEntity
 */
export interface UserEntity {
    /**
     * 
     * @type {number}
     * @memberof UserEntity
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof UserEntity
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof UserEntity
     */
    name: string;
}

/**
 * Check if a given object implements the UserEntity interface.
 */
export function instanceOfUserEntity(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function UserEntityFromJSON(json: any): UserEntity {
    return UserEntityFromJSONTyped(json, false);
}

export function UserEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'email': json['email'],
        'name': json['name'],
    };
}

export function UserEntityToJSON(value?: UserEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'email': value.email,
        'name': value.name,
    };
}
