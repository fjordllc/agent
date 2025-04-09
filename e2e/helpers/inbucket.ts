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

function mapMailPitMessage(raw: any): InbucketEmail {
  return {
    id: raw.ID,
    header: {
      subject: raw.Subject,
      from: raw.From?.Address || "",
      to: raw.To ? raw.To.map((recipient: any) => recipient.Address) : [],
    },
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

    const url = `${E2E_CONFIG.INBUCKET_API}/${encodeURIComponent(email)}`;
    console.log("Fetching from:", url);

    const response = await fetch(url);
    if (!response.ok) {
      console.log("Response not OK, status:", response.status);
      retries++;
      continue;
    }

    const data = await response.json();
    const emails: InbucketEmail[] = (data.messages || []).map(
      mapMailPitMessage,
    );
    console.log("Emails received:", emails.length);

    if (emails.length > 0) {
      return emails;
    }

    retries++;
  }

  throw new Error(`${maxRetries}回の試行後もメールが見つかりませんでした`);
}

export async function getEmailDetails(emailId: string): Promise<InbucketEmail> {
  const url = `${E2E_CONFIG.INBUCKET_MESSAGE_API}${emailId}`;
  console.log("Fetching detailed email from:", url);
  const response = await fetch(url);
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
  console.log(`emails: ${emails[0].id} ${emails[0].body}`);
  const emailDetails = await getEmailDetails(emails[0].id);

  if (!emailDetails.body?.html) {
    throw new Error("メールのHTML内容が見つかりません");
  }

  return extractConfirmationLink(emailDetails.body.html);
}
