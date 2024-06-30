import { useState, useEffect } from "react";

enum Phase {
  Typing,
  Pausing,
  Deleting,
}

const TYPING_INTERVAL = 150;
const PAUSE_MS = 1000;
const DELETING_MS = 50;

const useTypingInterval = (textList: string[]) => {
  const [typingText, setTypingText] = useState<string>("");

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [phase, setPhase] = useState<any>(Phase.Typing);

  useEffect(() => {
    switch (phase) {
      case Phase.Typing: {
        const nextTypingText = textList[selectedIndex]?.slice(0, typingText?.length + 1);
        if (nextTypingText === typingText) {
          setPhase(Phase.Pausing);
          return;
        }
        const timeOut = setTimeout(() => {
          setTypingText(nextTypingText);
        }, TYPING_INTERVAL);
        return () => clearTimeout(timeOut);
      }

      case Phase.Deleting: {
        if (!typingText) {
          const nextIndex = selectedIndex + 1;
          setSelectedIndex(textList[selectedIndex] ? nextIndex : 0);
          setPhase(Phase.Typing);
          return;
        }
        const nextRemaining = textList[selectedIndex]?.slice(0, typingText?.length - 1);
        const timeOut = setTimeout(() => {
          setTypingText(nextRemaining);
        }, DELETING_MS);
        return () => clearTimeout(timeOut);
      }

      case Phase.Pausing:

      default:
        const timeOut = setTimeout(() => {
          setPhase(Phase.Deleting);
        }, PAUSE_MS);
        return () => {
          clearTimeout(timeOut);
        };
    }
  }, [textList, typingText, selectedIndex, phase]);

  return typingText;
};

export default useTypingInterval;
