function PostHeader({ photo, name, date }) {
  return (
    <div className='flex'>
      <img className=' rounded-full w-10 h-10 mr-3' src={photo} alt={name} />
      <div>
        <h3 className='text-md font-semibold '>{name}</h3>
        <p className='text-xs text-gray-500'>
          {date.split(".", 1).join().replace("T", " ")}
        </p>
      </div>
    </div>
  );
}

export default PostHeader;
