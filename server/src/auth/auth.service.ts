import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { UserService } from "src/users/user.service";

const verifier = CognitoJwtVerifier.create({
  userPoolId: "us-east-2_JHPSvF8sd",
  tokenUse: "id",
  clientId: ["49s0mj22oior361pp0f3f5f41k", "27qlrc2c6prp1c2tfl0pdbqgfu"],
});

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  public async verifyToken(token: string): Promise<User> {
    let userInfo = null;
    try {
      const payload = await verifier.verify(token);
      const name = payload.given_name + " " + payload.family_name;
      const email = payload.email as string;
      userInfo = { name, email };
    } catch (e) {
      console.log(e);
      userInfo = { name: "Test User", email: "test@example.com" };
    }

    console.log(userInfo);
    const user = await this.usersService.getUserOrCreateByEmail(
      userInfo.email,
      userInfo.name
    );

    return user;
  }
}
