const BTStyle = {
  blue: {
    base: "bg-blue-500",
    hover: "hover:bg-blue-900",
  },
  orange: {
    base: "bg-orange-500",
    hover: "hover:bg-orange-900",
  },
  lime: {
    base: "bg-lime-500",
    hover: "hover:bg-lime-900",
  },
} as const;

type BtColor = keyof typeof BTStyle;
// type BtColor = 'blue' | 'orange' | 'lime';

interface TailButtonProps {
  color: BtColor;
  caption: string;
  onHandle? : (e:React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TailButton({ color, caption, onHandle } : TailButtonProps) {
  const btstyle = BTStyle[color];

  return (
    <button
      className={`${btstyle.base} text-white rounded m-1
                       ${btstyle.hover} hover:font-bold px-4 py-2`}
      onClick={onHandle}
    >
      {caption}
    </button>
  );
}
