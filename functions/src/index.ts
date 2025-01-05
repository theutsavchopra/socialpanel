import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.setAdmin = functions.https.onCall(async (data, context) => {
  // Only allow super admins to set other admins
  if (!context.auth?.token.superAdmin) {
    throw new functions.https.HttpsError(
      'permission-denied', 
      'Only super admins can set admin privileges'
    );
  }

  const { email } = data;
  if (!email) {
    throw new functions.https.HttpsError(
      'invalid-argument', 
      'Email is required'
    );
  }

  try {
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);
    
    // Set admin claim
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    
    return { success: true };
  } catch (error) {
    throw new functions.https.HttpsError(
      'internal',
      'Failed to set admin privileges'
    );
  }
});
