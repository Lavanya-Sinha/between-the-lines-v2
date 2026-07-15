import { OAuth2Client } from "google-auth-library";

const googleTokenVerifier = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const verifyGoogleToken = async(credential)=>{
  const ticket = await googleTokenVerifier.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID
  })
  const payload = ticket.getPayload()
  return{
    email: payload.email,
  displayName: payload.name,
  googleId: payload.sub,
  picture: payload.picture,
  }
}
export default verifyGoogleToken