import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getStorage, Storage } from "firebase-admin/storage";

let adminApp: App;
let adminDb: Firestore;
let adminStorage: Storage;

const initializeFirebaseAdmin = () => {
	if (getApps().length === 0) {
		let serviceAccount: any;

		if (process.env.FIREBASE_SERVICE_ACCOUNT) {
			if (typeof process.env.FIREBASE_SERVICE_ACCOUNT === "object") {
				serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
			} else {
				try {
					serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
				} catch (error) {
					const message =
						error instanceof Error ? error.message : String(error);
					console.error("[Firebase Admin] Failed to parse FIREBASE_SERVICE_ACCOUNT JSON:", message);
					throw new Error(
						`FIREBASE_SERVICE_ACCOUNT environment variable contains invalid JSON: ${message}`
					);
				}
			}
		}

		if (!serviceAccount || !serviceAccount.project_id || !serviceAccount.private_key) {
			console.error("[Firebase Admin] Missing required service account fields (project_id or private_key).");
			throw new Error(
				"FIREBASE_SERVICE_ACCOUNT environment variable is not set or invalid"
			);
		}

		// Ensure escaped newlines in private_key are converted properly
		if (typeof serviceAccount.private_key === "string" && serviceAccount.private_key.includes("\\n")) {
			serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
		}

		const projectId = serviceAccount.project_id || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "devnest-club";
		const storageBucket =
			process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
			`${projectId}.firebasestorage.app`;

		adminApp = initializeApp({
			credential: cert(serviceAccount),
			projectId,
			storageBucket,
		});
	} else {
		adminApp = getApps()[0];
	}

	if (!adminDb) {
		adminDb = getFirestore(adminApp);
		try {
			adminDb.settings({ ignoreUndefinedProperties: true });
		} catch {
			// Settings might already be frozen if previously initialized
		}
	}
	adminStorage = getStorage(adminApp);

	return { adminApp, adminDb, adminStorage };
};

export { initializeFirebaseAdmin };
