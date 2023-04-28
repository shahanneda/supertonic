/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-east-2",
    "aws_cognito_identity_pool_id": "us-east-2:a48b4e43-4352-4928-b7a1-d7bc95a8fe03",
    "aws_cognito_region": "us-east-2",
    "aws_user_pools_id": "us-east-2_JHPSvF8sd",
    "aws_user_pools_web_client_id": "49s0mj22oior361pp0f3f5f41k",
    "oauth": {
        "domain": "supertonic41eaa75f-41eaa75f-dev.auth.us-east-2.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "http://localhost:4000/,http://localhost:19006/,exp://192.168.1.79:19000/,https://getsupertonic.com/,supertonic://",
        "redirectSignOut": "http://localhost:4000/,http://localhost:19006/,exp://192.168.1.79:19000/,https://getsupertonic.com/,supertonic://",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [
        "GOOGLE"
    ],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};


export default awsmobile;
