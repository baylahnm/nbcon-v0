"use client";

import * as React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { GeneralSettings } from "./tabs/GeneralSettings";
import { NotificationsSettings } from "./tabs/NotificationsSettings";
import { PersonalizationSettings } from "./tabs/PersonalizationSettings";
import { ConnectorsSettings } from "./tabs/ConnectorsSettings";
import { SchedulesSettings } from "./tabs/SchedulesSettings";
import { OrdersSettings } from "./tabs/OrdersSettings";
import { DataControlsSettings } from "./tabs/DataControlsSettings";
import { SecuritySettings } from "./tabs/SecuritySettings";
import { ParentalControlsSettings } from "./tabs/ParentalControlsSettings";
import { AccountSettings } from "./tabs/AccountSettings";
import { cn } from "@/lib/utils";

const contentClassName = cn(
  "text-foreground relative flex max-h-[calc(100vh-150px)] w-full flex-col overflow-y-auto px-4 text-sm md:min-h-[380px]",
  "mt-0 outline-none"
);

interface SettingsContentProps {
  activeTab: string;
}

export function SettingsContent({ activeTab }: SettingsContentProps) {
  return (
    <div className="grow overflow-y-auto bg-background dark:bg-[#212121]">
      {activeTab === "General" && (
        <TabsContent value="General" className={contentClassName}>
          <GeneralSettings />
        </TabsContent>
      )}
      {activeTab === "Notifications" && (
        <TabsContent value="Notifications" className={contentClassName}>
          <NotificationsSettings />
        </TabsContent>
      )}
      {activeTab === "Personalization" && (
        <TabsContent value="Personalization" className={contentClassName}>
          <PersonalizationSettings />
        </TabsContent>
      )}
      {activeTab === "Connectors" && (
        <TabsContent value="Connectors" className={contentClassName}>
          <ConnectorsSettings />
        </TabsContent>
      )}
      {activeTab === "Schedules" && (
        <TabsContent value="Schedules" className={contentClassName}>
          <SchedulesSettings />
        </TabsContent>
      )}
      {activeTab === "Orders" && (
        <TabsContent value="Orders" className={contentClassName}>
          <OrdersSettings />
        </TabsContent>
      )}
      {activeTab === "DataControls" && (
        <TabsContent value="DataControls" className={contentClassName}>
          <DataControlsSettings />
        </TabsContent>
      )}
      {activeTab === "Security" && (
        <TabsContent value="Security" className={contentClassName}>
          <SecuritySettings />
        </TabsContent>
      )}
      {activeTab === "ParentalControls" && (
        <TabsContent value="ParentalControls" className={contentClassName}>
          <ParentalControlsSettings />
        </TabsContent>
      )}
      {activeTab === "Account" && (
        <TabsContent value="Account" className={contentClassName}>
          <AccountSettings />
        </TabsContent>
      )}
    </div>
  );
}

