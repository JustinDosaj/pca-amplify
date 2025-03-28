import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { chatCompletion } from './functions/chat/resource';
import { removePersonalInfo } from './functions/remove/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  data,
  chatCompletion,
  removePersonalInfo
});