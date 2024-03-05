import { FieldValue } from "firebase-admin/firestore";
import client from "../../client";
import { firestore as modelsFirestore } from "../../models/firestore";

/**
 * Sync user display name and name id
 * @returns {Promise<void>}
 */
export async function migrationPostFieldRemove(): Promise<void> {
  const fireStore = client.firebase.firestoreInstance;

  const batch = fireStore.batch();

  const posts = (await modelsFirestore.users.getPost({})) as any;
  try {
    posts.map((post) => {
      batch.update(post.ref, {
        photoURL: FieldValue.delete(),
        displayName: FieldValue.delete(),
      });
      if (post.data().image === "" || Array.isArray(post.data().image)) {
        if (post.data().image.length === 0) {
          batch.update(post.ref, {
            image: FieldValue.delete(),
          });
        }
      }

      if (post.data().description && !Array.isArray(post.data().image)) {
        batch.update(post.ref, {
          image: [post.data().image],
        });
      }

      if (post.data().image && !post.data().description) {
        batch.update(post.ref, {
          type: "IMAGE",
          video: FieldValue.delete(),
        });
      }

      if (post.data().video) {
        batch.update(post.ref, {
          type: "VIDEO",
        });
      }

      if (post.data().description) {
        batch.update(post.ref, {
          type: "PREVIEW",
        });
      }

      if (!post.data().video && !post.data().image) {
        batch.update(post.ref, {
          type: "TEXT",
        });
      }

      if (post.data().preview) {
        batch.update(post.ref, {
          type: "PREVIEW",
          image: post.data().preview.image,
          description: post.data().preview.description,
          title: post.data().preview.title,
          url: post.data().preview.url,
          preview: FieldValue.delete(),
        });
      }
    });

    batch.commit();
  } catch (e) {
    throw new Error(`Migration failed to run (${String(e)})`);
  }
}

migrationPostFieldRemove();
