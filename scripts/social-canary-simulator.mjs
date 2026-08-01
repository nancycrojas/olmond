const retryable = new Set(["retryable_failure", "timeout_after_commit"]);

export function runSocialCanary({ deliveries, scenarios = {}, maxAttempts = 3 }) {
  const remotePosts = new Map();
  const remoteCommits = [];
  const ledger = [];
  let submissions = 0;

  for (const delivery of deliveries) {
    let state = "QUEUED";
    let attempts = 0;
    let remoteUrl = "";
    const outcomes = scenarios[delivery.delivery_id] || ["success"];

    while (attempts < maxAttempts && !["PUBLISHED", "FAILED_FINAL"].includes(state)) {
      if (remotePosts.has(delivery.delivery_id)) {
        state = "PUBLISHED";
        remoteUrl = remotePosts.get(delivery.delivery_id);
        break;
      }

      const outcome = outcomes[Math.min(attempts, outcomes.length - 1)];
      attempts += 1;
      submissions += 1;
      const candidateUrl = `https://social.example/${delivery.destination}/${delivery.delivery_id}`;

      if (outcome === "success") {
        remotePosts.set(delivery.delivery_id, candidateUrl);
        remoteCommits.push(delivery.delivery_id);
        state = "PUBLISHED";
        remoteUrl = candidateUrl;
      } else if (outcome === "timeout_after_commit") {
        remotePosts.set(delivery.delivery_id, candidateUrl);
        remoteCommits.push(delivery.delivery_id);
        state = "RETRYABLE_FAILURE";
      } else if (outcome === "final_failure") {
        state = "FAILED_FINAL";
      } else if (retryable.has(outcome)) {
        state = "RETRYABLE_FAILURE";
      } else {
        throw new Error(`UNKNOWN_CANARY_OUTCOME:${outcome}`);
      }
    }

    if (state === "RETRYABLE_FAILURE" && remotePosts.has(delivery.delivery_id)) {
      state = "PUBLISHED";
      remoteUrl = remotePosts.get(delivery.delivery_id);
    } else if (state === "RETRYABLE_FAILURE") {
      state = "FAILED_FINAL";
    }

    ledger.push({
      delivery_id: delivery.delivery_id,
      destination: delivery.destination,
      state,
      attempts,
      remote_url: remoteUrl,
    });
  }

  return {
    ledger,
    submissions,
    published: ledger.filter((row) => row.state === "PUBLISHED").length,
    failed: ledger.filter((row) => row.state === "FAILED_FINAL").length,
    duplicate_remote_posts: remoteCommits.length - new Set(remoteCommits).size,
  };
}
