import Tag from "./Tag";

// import img
import deleteIcon from "../assets/delete.png";

export default function TaskCard({ title, tags, handleDelete, index }) {
  return (
    <article className=" w-full min-h-24 border border-[#dcdcdc] rounded-xl p-4 my-4 mx-0">
      <p className=" text-lg font-bold mb-4">{title}</p>
      <div className=" flex items-center justify-between">
        <div className="">
          {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} selected={true} />
          ))}
        </div>
        <div className=" w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition duration-300 ease-in-out hover:ease-out hover:bg-[#ebebeb]" onClick={() => {
          handleDelete(index)
        }}>
          <img
            src={deleteIcon}
            alt="Delete Icon"
            className=" w-5 opacity-[50%] transition duration-300 ease-in-out hover:opacity-[80%]"
          />
        </div>
      </div>
    </article>
  );
}
