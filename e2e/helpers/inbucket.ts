import { E2E_CONFIG } from "../constants";

interface InbucketEmail {
  id: string;
  header: {
    subject: string;
    to: string[];
    from: string;
  };
  body?: {
    html?: string;
    text?: string;
  };
}

export async function clearMailbox(email: string): Promise<void> {
  await fetch(`${E2E_CONFIG.INBUCKET_API}/${email}`, {
    method: "DELETE",
  });
}

export async function waitForEmail(
  email: string,
  options: { maxRetries?: number; retryInterval?: number } = {},
): Promise<InbucketEmail[]> {
  const maxRetries = options.maxRetries || 12;
  const retryInterval = options.retryInterval || 5000;

  let retries = 0;
  while (retries < maxRetries) {
    await new Promise((resolve) => setTimeout(resolve, retryInterval));

    const response = await fetch(`${E2E_CONFIG.INBUCKET_API}/${email}`);
    if (!response.ok) {
      retries++;
      continue;
    }

    const emails: InbucketEmail[] = await response.json();
    if (emails.length > 0) {
      return emails;
    }

    retries++;
  }

  throw new Error(`${maxRetries}回の試行後もメールが見つかりませんでした`);
}

export async function getEmailDetails(
  email: string,
  emailId: string,
): Promise<InbucketEmail> {
  const response = await fetch(
    `${E2E_CONFIG.INBUCKET_API}/${email}/${emailId}`,
  );
  if (!response.ok) {
    throw new Error(`メール詳細の取得に失敗: ${response.statusText}`);
  }
  return response.json();
}

export function extractConfirmationLink(htmlContent: string): string {
  const linkMatch = htmlContent.match(/href="([^"]+)"/);
  if (!linkMatch) {
    throw new Error("確認リンクがメールのHTML内に見つかりません");
  }
  return linkMatch[1];
}

export async function getConfirmationLink(email: string): Promise<string> {
  const emails = await waitForEmail(email);
  const emailDetails = await getEmailDetails(email, emails[0].id);

  if (!emailDetails.body?.html) {
    throw new Error("メールのHTML内容が見つかりません");
  }

  return extractConfirmationLink(emailDetails.body.html);
}
