import { Button } from "antd";
import { t } from "i18next";
import { acceptInvite, rejectInvite } from "../actions";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
export default function AcceptOrRejectButtons({ id, invite }) {
  const [isLoading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  return (
    <div className="flex gap-2 w-1/4">
      {(invite.status == 1 || invite.status == 0) && (
        <Button
          danger
          disabled={isLoading}
          onClick={async () => {
            setLoading(true);
            await rejectInvite(id);
            queryClient.invalidateQueries(["requests"]);
            setLoading(false);
          }}
        >
          {t("reject")}
        </Button>
      )}
      {(invite.status == 2 || invite.status == 0) && (
        <Button
          type="primary"
          disabled={isLoading}
          onClick={async () => {
            setLoading(true);
            await acceptInvite(id);
            queryClient.invalidateQueries(["requests"]);
            setLoading(false);
          }}
        >
          {t("accept")}
        </Button>
      )}
    </div>
  );
}
