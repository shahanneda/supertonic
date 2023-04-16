import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";

function useAuthentication(): string | null {
  const [token, setToken] = useState<string>(null);

  useEffect(() => {
    Auth.currentSession().then((session) => {
      console.log(session.getIdToken().getJwtToken());
      setToken(session.getIdToken().getJwtToken());
    });
  }, []);

  return token;
}
export { useAuthentication };
