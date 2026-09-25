import React, { useState, useMemo } from "react";
import {
  Mail,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Eye,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  Sparkles,
  Loader2,
  User,
  Calendar,
  Send,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { MessageRecord, MessageStats } from "../../../server/messages-storage";
import { exportToExcel } from "@/lib/excel-export";

interface AdminMessagesViewProps {
  messages: MessageRecord[];
  stats: MessageStats | null;
  loading: boolean;
  onUpdateStatus: (id: string, status: "unread" | "read" | "replied") => Promise<void>;
  onDeleteMessage: (id: string) => Promise<void>;
  actionLoadingId: string | null;
  onRefresh: () => void;
}

export function AdminMessagesView({
  messages,
  stats,
  loading,
  onUpdateStatus,
  onDeleteMessage,
  actionLoadingId,
  onRefresh,
}: AdminMessagesViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [selectedMessage, setSelectedMessage] = useState<MessageRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filter and sort messages
  const filteredMessages = useMemo(() => {
    return messages
      .filter((m) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          m.name.toLowerCase().includes(query) ||
          m.email.toLowerCase().includes(query) ||
          m.subject.toLowerCase().includes(query) ||
          m.message.toLowerCase().includes(query);

        const matchesStatus = statusFilter === "all" || m.status === statusFilter;

        return matchesQuery && matchesStatus;
      })
      .sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return sortBy === "newest" ? timeB - timeA : timeA - timeB;
      });
  }, [messages, searchQuery, statusFilter, sortBy]);

  // Handle Export Excel (.xlsx)
  const handleExportExcel = () => {
    if (filteredMessages.length === 0) return;

    exportToExcel({
      filename: `devnest_contact_messages_${new Date().toISOString().split("T")[0]}.xlsx`,
      sheetName: "Contact Messages",
      data: filteredMessages,
      columns: [
        { header: "ID", accessor: (m) => m.id, width: 22 },
        { header: "Sender Name", accessor: (m) => m.name, width: 22 },
        { header: "Email", accessor: (m) => m.email, width: 28 },
        { header: "Subject", accessor: (m) => m.subject, width: 26 },
        { header: "Message Content", accessor: (m) => m.message, width: 45 },
        { header: "Status", accessor: (m) => m.status, width: 14 },
        { header: "Received At", accessor: (m) => new Date(m.createdAt).toLocaleString(), width: 22 },
        { header: "Updated At", accessor: (m) => new Date(m.updatedAt).toLocaleString(), width: 22 },
      ],
    });
  };

  const getStatusBadge = (status: MessageRecord["status"]) => {
    switch (status) {
      case "unread":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Unread
          </span>
        );
      case "read":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Eye className="w-3 h-3" />
            Reviewed
          </span>
        );
      case "replied":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold">
            <CheckCircle2 className="w-3 h-3" />
            Replied
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Total Inquiries */}
        <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-border/80 flex flex-col justify-between shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Inquiries
            </span>
            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-poppins font-bold text-foreground">
              {stats ? stats.total : messages.length}
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">All received contact form submissions</p>
          </div>
        </div>

        {/* Unread Inquiries */}
        <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-amber-500/30 bg-amber-500/[0.02] flex flex-col justify-between shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
              Pending / Unread
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-poppins font-bold text-amber-500">
              {stats ? stats.unread : messages.filter((m) => m.status === "unread").length}
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">Awaiting initial review or response</p>
          </div>
        </div>

        {/* Replied */}
        <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-emerald-500/30 bg-emerald-500/[0.02] flex flex-col justify-between shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">
              Responded
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-poppins font-bold text-emerald-500">
              {stats ? stats.replied : messages.filter((m) => m.status === "replied").length}
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">Handled inquiries & follow-ups</p>
          </div>
        </div>

        {/* Recent This Week */}
        <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-purple-500/30 bg-purple-500/[0.02] flex flex-col justify-between shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              Past 7 Days
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-poppins font-bold text-purple-400">
              {stats ? stats.recentThisWeek : messages.length}
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">Recent community activity</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-border/80 shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search inquiries by sender, email, subject, or message content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl bg-background/60 border-border/80 text-sm focus:border-primary/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filters & Export */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-background/60 border border-border/80 rounded-xl px-3 h-11">
              <Filter className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs font-medium text-foreground focus:outline-none cursor-pointer pr-2"
              >
                <option value="all">All Statuses ({messages.length})</option>
                <option value="unread">
                  Unread ({messages.filter((m) => m.status === "unread").length})
                </option>
                <option value="read">
                  Reviewed ({messages.filter((m) => m.status === "read").length})
                </option>
                <option value="replied">
                  Replied ({messages.filter((m) => m.status === "replied").length})
                </option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-center gap-1.5 bg-background/60 border border-border/80 rounded-xl px-3 h-11">
              <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
                className="bg-transparent text-xs font-medium text-foreground focus:outline-none cursor-pointer pr-2"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* Export Excel */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportExcel}
              disabled={filteredMessages.length === 0}
              className="h-11 rounded-xl border-border/80 text-xs font-medium gap-1.5 cursor-pointer"
              title="Export Messages to Excel (.xlsx)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Excel</span>
            </Button>
          </div>
        </div>

        {/* Active Query/Filter Badges */}
        {(searchQuery || statusFilter !== "all") && (
          <div className="flex items-center gap-2 pt-2 border-t border-border/40 text-xs text-muted-foreground">
            <span>Showing {filteredMessages.length} of {messages.length} inquiries</span>
            {(searchQuery || statusFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                className="text-primary hover:underline font-medium ml-2"
              >
                Reset all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Messages List / Table */}
      {loading ? (
        <div className="glass-panel rounded-3xl p-12 border border-border/80 flex flex-col items-center justify-center text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
          <p className="text-sm font-semibold text-foreground">Loading contact messages...</p>
          <p className="text-xs text-muted-foreground mt-1">Retrieving latest records</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 border border-border/80 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-muted/60 border border-border flex items-center justify-center text-muted-foreground mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-poppins font-bold text-foreground mb-1">
            {messages.length === 0 ? "No Inquiries Received Yet" : "No Matching Messages Found"}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-5">
            {messages.length === 0
              ? "Messages sent through the public /contact page will immediately appear in this portal."
              : "Try adjusting your search keywords or clearing the status filter."}
          </p>
          {messages.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
              }}
              className="rounded-xl text-xs"
            >
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl border border-border/80 shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border/80 bg-secondary/50 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  <th className="py-3.5 px-4 sm:px-6">Sender & Contact</th>
                  <th className="py-3.5 px-4 sm:px-6">Subject & Preview</th>
                  <th className="py-3.5 px-4 sm:px-6">Status</th>
                  <th className="py-3.5 px-4 sm:px-6">Received</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredMessages.map((msg) => {
                  const isUnread = msg.status === "unread";
                  return (
                    <tr
                      key={msg.id}
                      className={`hover:bg-muted/40 transition-colors ${
                        isUnread ? "bg-primary/[0.02] font-medium" : ""
                      }`}
                    >
                      {/* Sender */}
                      <td className="py-4 px-4 sm:px-6 align-top">
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                            <User className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="font-semibold text-foreground block truncate">
                              {msg.name}
                            </span>
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                              className="text-xs text-muted-foreground hover:text-primary transition-colors block truncate"
                              title="Send Email"
                            >
                              {msg.email}
                            </a>
                          </div>
                        </div>
                      </td>

                      {/* Subject & Preview */}
                      <td className="py-4 px-4 sm:px-6 align-top max-w-xs sm:max-w-md">
                        <div className="space-y-1">
                          <div className="font-semibold text-foreground line-clamp-1">
                            {msg.subject}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {msg.message}
                          </p>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 sm:px-6 align-top whitespace-nowrap">
                        {getStatusBadge(msg.status)}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 sm:px-6 align-top whitespace-nowrap text-xs text-muted-foreground">
                        <div>{new Date(msg.createdAt).toLocaleDateString()}</div>
                        <div className="text-[11px] text-muted-foreground/70">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 align-top text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View message detail */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedMessage(msg);
                              if (msg.status === "unread") {
                                onUpdateStatus(msg.id, "read");
                              }
                            }}
                            className="rounded-xl h-8 px-2.5 text-xs text-foreground hover:bg-muted gap-1 cursor-pointer"
                            title="View Full Message"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">View</span>
                          </Button>

                          {/* Quick Reply via Mailto */}
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}&body=${encodeURIComponent(
                              `Hi ${msg.name},\n\nThank you for reaching out to DevNest regarding "${msg.subject}".\n\n`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              if (msg.status !== "replied") {
                                onUpdateStatus(msg.id, "replied");
                              }
                            }}
                            className="inline-flex items-center justify-center rounded-xl h-8 px-2.5 text-xs font-medium text-primary hover:bg-primary/10 border border-primary/20 gap-1 transition-colors"
                            title="Reply via Default Email Client"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Reply</span>
                          </a>

                          {/* Status toggle button */}
                          {msg.status === "unread" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={actionLoadingId === msg.id}
                              onClick={() => onUpdateStatus(msg.id, "read")}
                              className="rounded-xl h-8 px-2 text-xs border-border/80 text-muted-foreground hover:text-foreground cursor-pointer"
                              title="Mark as Read"
                            >
                              {actionLoadingId === msg.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          ) : msg.status === "read" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={actionLoadingId === msg.id}
                              onClick={() => onUpdateStatus(msg.id, "replied")}
                              className="rounded-xl h-8 px-2 text-xs border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 cursor-pointer"
                              title="Mark as Replied"
                            >
                              {actionLoadingId === msg.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={actionLoadingId === msg.id}
                              onClick={() => onUpdateStatus(msg.id, "read")}
                              className="rounded-xl h-8 px-2 text-xs border-border/80 text-muted-foreground hover:text-foreground cursor-pointer"
                              title="Revert status to Reviewed"
                            >
                              {actionLoadingId === msg.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          )}

                          {/* Delete */}
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={actionLoadingId === msg.id}
                            onClick={() => setDeleteConfirmId(msg.id)}
                            className="rounded-xl h-8 px-2.5 text-xs font-space font-bold border-2 border-black bg-[#FF5F56] text-white hover:bg-[#FA4D44] shadow-[2px_2px_0px_#000] cursor-pointer gap-1"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MESSAGE DETAIL MODAL */}
      <Dialog
        open={!!selectedMessage}
        onOpenChange={(open) => {
          if (!open) setSelectedMessage(null);
        }}
      >
        <DialogContent className="max-w-xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
          {selectedMessage && (
            <div className="space-y-6">
              <DialogHeader className="text-left pb-4 border-b border-border/60">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="badge-pill">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span>Contact Inquiry</span>
                  </div>
                  <div>{getStatusBadge(selectedMessage.status)}</div>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-poppins font-bold text-foreground">
                  {selectedMessage.subject}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-1">
                  Received on {new Date(selectedMessage.createdAt).toLocaleString()}
                </DialogDescription>
              </DialogHeader>

              {/* Sender Details Box */}
              <div className="p-4 rounded-2xl bg-secondary/50 border border-border/80 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground font-medium">From:</span>
                  <span className="text-xs font-semibold text-foreground">{selectedMessage.name}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground font-medium">Email:</span>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  Message Body
                </span>
                <div className="p-4 sm:p-5 rounded-2xl bg-background/80 border border-border/80 text-foreground text-sm leading-relaxed whitespace-pre-wrap selection:bg-primary/20">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Status & Actions Footer */}
              <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Status:</span>
                  <div className="inline-flex rounded-xl p-0.5 bg-secondary border border-border text-xs">
                    {(["unread", "read", "replied"] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => {
                          onUpdateStatus(selectedMessage.id, st);
                          setSelectedMessage((prev) => (prev ? { ...prev, status: st } : null));
                        }}
                        className={`px-2.5 py-1 rounded-lg font-medium capitalize transition-colors ${
                          selectedMessage.status === st
                            ? "bg-primary text-primary-foreground font-semibold shadow-subtle"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}&body=${encodeURIComponent(
                      `Hi ${selectedMessage.name},\n\nThank you for reaching out to DevNest regarding "${selectedMessage.subject}".\n\n`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      onUpdateStatus(selectedMessage.id, "replied");
                      setSelectedMessage((prev) => (prev ? { ...prev, status: "replied" } : null));
                    }}
                    className="inline-flex items-center justify-center rounded-xl h-10 px-4 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 shadow-subtle transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setDeleteConfirmId(selectedMessage.id);
                    }}
                    className="rounded-xl h-10 px-4 text-xs font-space font-bold border-2 border-black bg-[#FF5F56] text-white hover:bg-[#FA4D44] shadow-[3px_3px_0px_#000] cursor-pointer gap-1.5"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Message</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog
        open={!!deleteConfirmId}
        onOpenChange={(open) => !open && setDeleteConfirmId(null)}
      >
        <DialogContent className="max-w-md rounded-3xl p-6 sm:p-7">
          <DialogHeader className="text-left">
            <div className="w-12 h-12 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-center mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <DialogTitle className="text-lg sm:text-xl font-poppins font-bold text-foreground">
              Delete Message Inquiry?
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
              This will permanently delete this inquiry record from local storage and database. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex items-center justify-end gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteConfirmId(null)}
              className="rounded-xl text-xs font-semibold cursor-pointer border-2 border-black shadow-[2px_2px_0px_#000]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={actionLoadingId === deleteConfirmId}
              onClick={async () => {
                if (deleteConfirmId) {
                  await onDeleteMessage(deleteConfirmId);
                  if (selectedMessage?.id === deleteConfirmId) {
                    setSelectedMessage(null);
                  }
                  setDeleteConfirmId(null);
                }
              }}
              className="rounded-xl text-xs font-space font-bold border-2 border-black bg-[#FF5F56] text-white hover:bg-[#FA4D44] shadow-[3px_3px_0px_#000] gap-1.5 cursor-pointer"
            >
              {actionLoadingId === deleteConfirmId ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
              <span>Delete Permanently</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
