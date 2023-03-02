export default function isRepoName(nodeName) {
  // A repo name should be xxx/xxx
  return nodeName.includes("/");
}
