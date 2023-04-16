import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";

function useAuthentication(): string | null {
  const [token, setToken] = useState<string>(null);

  useEffect(() => {
    Auth.currentSession().then((session) => {
      setToken(session.getIdToken().getJwtToken());
    });
  }, []);

  return token;
}
export { useAuthentication };
