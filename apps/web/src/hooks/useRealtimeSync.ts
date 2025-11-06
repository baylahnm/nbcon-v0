import { useEffect } from "react";
import { supabase } from "@nbcon/config";

export function useRealtimeSync<T = unknown>(
  channelName: string,
  callback: (data: T) => void
) {
  useEffect(() => {
    const channel = supabase.channel(channelName);

    channel.on("broadcast", { event: "refresh" }, (payload) => {
      callback(payload.payload);
    });

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelName, callback]);
}

