// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, UserRelationship } = initSchema(schema);

export {
  User,
  UserRelationship
};