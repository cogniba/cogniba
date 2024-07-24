import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface StartScreenProps {
  visible: boolean;
  onStart: () => void;
}

export default function StartScreen({ visible, onStart }: StartScreenProps) {
  return (
    <Dialog defaultOpen open={visible}>
      {/* <DialogPortal container={playContainer.current}> */}
      <DialogContent closeButton={false}>
        <DialogTitle>Play the game</DialogTitle>
        <DialogDescription>
          Press the space bar when the square is visible
        </DialogDescription>
        <Button type="submit" onClick={onStart}>
          Play
        </Button>
      </DialogContent>
      {/* </DialogPortal> */}
    </Dialog>
  );
}
