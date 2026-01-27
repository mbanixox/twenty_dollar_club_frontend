"use client";

import {
  Bell,
  DollarSign,
  Folder,
  Heart,
  Users,
  ChevronDown,
  ChevronRight,
  Trash2,
  Circle,
  CheckCircle2,
} from "lucide-react";
import { Notification } from "@/lib/types";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { markRead, markUnread } from "@/lib/notifications/actions";

const GeneralNotifications = ({
  notifications,
}: {
  notifications: Notification[];
}) => {
  const [notificationList, setNotificationList] = useState(notifications);
  const [, setNow] = useState(0);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  type ResourceType = "project" | "membership" | "contribution" | "beneficiary";
  type TitleType =
    | "new_project_created"
    | "project_updated"
    | "project_deleted"
    | "pending_project_contribution"
    | "contribution_received"
    | "beneficiary_added"
    | "pending_membership_approval";

  const NotificationIcon = ({
    resource_type,
  }: {
    resource_type: ResourceType;
  }) => {
    const iconProps = { className: "w-4 h-4" };

    switch (resource_type) {
      case "contribution":
        return <DollarSign {...iconProps} className="text-green-600" />;
      case "membership":
        return <Users {...iconProps} className="text-blue-600" />;
      case "project":
        return <Folder {...iconProps} className="text-purple-600" />;
      case "beneficiary":
        return <Heart {...iconProps} className="text-orange-600" />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  const getResourceLabel = (resource_type: ResourceType) => {
    const labels = {
      contribution: "Contributions",
      membership: "Memberships",
      project: "Projects",
      beneficiary: "Beneficiaries",
    };

    return labels[resource_type] || "Other";
  };

  const Title = ({ event }: { event: TitleType }) => {
    switch (event) {
      case "new_project_created":
        return "New Project Created";
      case "project_updated":
        return "Project Updated";
      case "project_deleted":
        return "Project Deleted";
      case "pending_project_contribution":
        return "Pending Project Contribution";
      case "contribution_received":
        return "Contribution Received";
      case "beneficiary_added":
        return "Beneficiary Added";
      case "pending_membership_approval":
        return "Pending Membership Approval";
      default:
        return "Notification";
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 5) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const toggleRead = async (id: string, currentReadStatus: boolean) => {
    setNotificationList((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: !currentReadStatus } : notif,
      ),
    );

    try {
      if (currentReadStatus) {
        await markUnread(id);
      } else {
        await markRead(id);
      }
    } catch (error) {
      setNotificationList((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read: currentReadStatus } : notif,
        ),
      );
      console.error("Failed to update notification:", error);
    }
  };

  const deleteNotification = async (id: string) => {
    const prevList = notificationList;
    setNotificationList((prev) => prev.filter((notif) => notif.id !== id));

    try {
      await deleteNotification(id);
    } catch (error) {
      setNotificationList(prevList);
      console.error("Failed to delete notification:", error);
    }
  };

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);

      if (next.has(groupKey)) {
        next.delete(groupKey);
      } else {
        next.add(groupKey);
      }

      return next;
    });
  };

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  // Group notifications by resource_type
  const groupedNotifications = notificationList.reduce(
    (acc, notification) => {
      const key = notification.resource_type;

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(notification);

      return acc;
    },
    {} as Record<ResourceType, Notification[]>,
  );

  return (
    <div className="space-y-3">
      {Object.entries(groupedNotifications).map(
        ([resourceType, notifications]) => {
          const isGroupExpanded = expandedGroups.has(resourceType);
          const unreadCount = notifications.filter((n) => !n.read).length;

          return (
            <Card key={resourceType} className="overflow-hidden">
              <button
                onClick={() => toggleGroup(resourceType)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <NotificationIcon
                    resource_type={resourceType as ResourceType}
                  />
                  <span className="font-medium text-sm">
                    {getResourceLabel(resourceType as ResourceType)}
                  </span>
                  <Badge variant="secondary" className="h-5 px-2 text-xs">
                    {notifications.length}
                  </Badge>
                  {unreadCount > 0 && (
                    <Badge variant="default" className="h-5 px-2 text-xs">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                {isGroupExpanded ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {isGroupExpanded && (
                <div className="border-t">
                  {notifications.map((notification) => {
                    const isItemExpanded = expandedItems.has(notification.id);

                    return (
                      <div
                        key={notification.id}
                        className={`border-b last:border-b-0 ${
                          !notification.read ? "bg-primary/5" : ""
                        }`}
                      >
                        <button
                          onClick={() => toggleItem(notification.id)}
                          className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-muted/30 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="shrink-0">
                              {notification.read ? (
                                <Circle className="w-2 h-2 text-muted-foreground" />
                              ) : (
                                <Circle className="w-2 h-2 text-primary fill-primary" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">
                                <Title event={notification.event} />
                              </h4>
                              {!isItemExpanded && (
                                <p className="text-xs text-muted-foreground truncate mt-0.5">
                                  {notification.message}
                                </p>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground shrink-0">
                              {formatTime(notification.inserted_at)}
                            </span>
                          </div>
                          {isItemExpanded ? (
                            <ChevronDown className="w-4 h-4 text-muted-foreground ml-2 shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground ml-2 shrink-0" />
                          )}
                        </button>

                        {isItemExpanded && (
                          <CardContent className="pt-0 pb-3 px-4 pl-10">
                            <p className="text-sm text-foreground mb-3">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs gap-1.5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleRead(
                                    notification.id,
                                    notification.read,
                                  );
                                }}
                              >
                                {notification.read ? (
                                  <>
                                    <Circle className="w-3 h-3" />
                                    Mark unread
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 className="w-3 h-3" />
                                    Mark read
                                  </>
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </Button>
                            </div>
                          </CardContent>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        },
      )}

      {notificationList.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
            <h3 className="font-semibold text-lg mb-2">No notifications</h3>
            <p className="text-sm text-muted-foreground text-center">
              You&apos;re all caught up! Check back later for updates.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GeneralNotifications;
