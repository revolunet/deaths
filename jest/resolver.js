module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath.split("__tests__").join("__tests__/__snapshots__") +
    snapshotExtension,

  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath
      .replace("/__snapshots__", "")
      .slice(0, -snapshotExtension.length),

  testPathForConsistencyCheck: "some/__tests__/example.test.js",
}
