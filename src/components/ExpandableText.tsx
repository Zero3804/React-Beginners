import React from 'react'
interface Props {
    children: string;
    maxChars?: number;
}
const ExpandableText = ({children, maxChars = 100} : Props) => {
    const [expanded, setExpanded] = React.useState(false);
  if (children.length <= maxChars) return <p>{children}</p>;

  const text = expanded ? children : children.substring(0, maxChars) + '...';
  return <p>{text}<button onClick={() => setExpanded(!expanded)}>{expanded ? "Less" : "More"}</button></p>;
}

export default ExpandableText