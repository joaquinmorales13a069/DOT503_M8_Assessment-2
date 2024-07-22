/* eslint-disable react/prop-types */
export default function Tag(props) {
  const tagStyle = {
    HTML: 'bg-[#fda821]',
    CSS: 'bg-[#15d4c8]',
    JavaScript: 'bg-[#ffd12c]',
    React: 'bg-[#4cdafc]',
    default: 'bg-[#fafafa]'
  }
  return (
    <button
      type="button"
      className={` tag ${props.selected ? tagStyle[props.tagName]: tagStyle.default}`}
      onClick={() => props.selectTag(props.tagName)}
    >
      {props.tagName}
    </button>
  );
}
