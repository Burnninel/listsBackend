import * as admin from "firebase-admin";
import * as serviceAccount from "../config/serviceAccountKey.json";

import prismaClient from "../prisma";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: process.env.FIREBASE_AUTH_DOMAIN,
});

class LoginGoogleService {
  async execute(token: string) {
    const tokenCheck = await admin.auth().verifyIdToken(token);

    const getUser = await admin.auth().getUser(tokenCheck.uid);
    const user = getUser.providerData[0];

    const {
      uid: googleId,
      displayName: username,
      email,
      photoURL: googlePhoto,
    } = user;

    let userCheck = await prismaClient.user.findFirst({
      where: {
        googleId: googleId,
      },
    });

    if (!userCheck) {
      userCheck = await prismaClient.user.create({
        data: {
          googleId,
          username,
          email,
          googlePhoto,
        },
      });
    }

    return { token, userCheck };
  }
}

export { LoginGoogleService };
