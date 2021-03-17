const { firestore } = require("../../firebase");

export const increment = firestore.FieldValue.increment(1);
export const decrement = firestore.FieldValue.increment(-1);
