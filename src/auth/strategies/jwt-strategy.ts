import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(configService: ConfigService){
    const secret = configService.get<string>('JWT_SECRET');

    if(!secret){
      throw Error('JWT_SECRET not defined in environment file');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }
  
  validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    }
  }
}