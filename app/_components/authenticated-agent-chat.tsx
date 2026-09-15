import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AgentChat } from "./agent-chat";
import { AppViewContainer } from "./app-view-container";
import { AccountControl, SignIn } from "./web-chat-auth";

export async function AuthenticatedAgentChat({
  sessionId,
  sessionless,
}: {
  readonly sessionId?: string;
  readonly sessionless?: boolean;
}) {
  if (process.env.NODE_ENV === "development") {
    return (
      <AppViewContainer>
        <AgentChat sessionId={sessionId} sessionless={sessionless} />
      </AppViewContainer>
    );
  }

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return <SignIn />;

  return (
    <>
      <AppViewContainer>
        <AgentChat sessionId={sessionId} sessionless={sessionless} />
      </AppViewContainer>
      <AccountControl
        email={session.user.email}
        image={session.user.image}
        name={session.user.name}
      />
    </>
  );
}
