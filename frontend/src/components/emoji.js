import React from "react";
import { Angry, Frown, Meh, Smile, Laugh } from "lucide-react";

const Emoji = () => {
  // Each item has an icon component and a score
  const emojiList = [
    { icon: <Laugh size={32} color="var(--green)" />, label: 0 },
    { icon: <Smile size={32} color="var(--light-green)" />, label: 0 },
    { icon: <Meh size={32} color="var(--yellow)" />, label: 0 },
    { icon: <Frown size={32} color="var(--orange)" />, label: 0 },
    { icon: <Angry size={32} color="var(--red)" />, label: 0 },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10px" }}>
      {emojiList.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1
          }}
        >
          {item.icon}
          <span style={{ fontSize: "0.6rem", marginTop: "2px" }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Emoji;
