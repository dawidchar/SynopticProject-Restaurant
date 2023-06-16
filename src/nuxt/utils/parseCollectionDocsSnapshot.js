export default collectionSnapshot => Array.isArray(collectionSnapshot.docs)
    ? collectionSnapshot.docs.filter(doc => doc.exists()).map(doc => ({ ...doc.data(), id: doc.id }))
    : []
