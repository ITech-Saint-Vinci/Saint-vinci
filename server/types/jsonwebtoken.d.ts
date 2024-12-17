import type { JwtPayload } from "jsonwebtoken";

declare module "jsonwebtoken" {
  interface JwtPayload extends JwtPayload {
    _id: string;
  }
}