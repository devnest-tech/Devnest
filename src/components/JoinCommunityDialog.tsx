import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { JoinCommunityStepper } from "./JoinCommunityStepper";

export const OPEN_JOIN_MODAL_EVENT = "devnest:open-join-community-modal";

export function openJoinCommunityModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_JOIN_MODAL_EVENT));
  }
}

interface JoinCommunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinCommunityDialog({
  open,
  onOpenChange,
}: JoinCommunityDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[92vh] overflow-y-auto p-4 sm:p-6 rounded-3xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader className="text-left pb-2 border-b border-border/50">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl p-1 bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="DevNest Logo"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <DialogTitle className="text-xl sm:text-2xl font-poppins font-bold tracking-tight text-foreground flex items-center gap-1.5">
                <span>Join</span>
                <span className="text-gradient-primary">DevNest Community</span>
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Fast-track onboarding powered by interactive React Bits Stepper.
          </DialogDescription>
        </DialogHeader>

        <div className="pt-2">
          <JoinCommunityStepper
            isDialog={true}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { JoinCommunityStepper };
