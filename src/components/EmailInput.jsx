import React, { useEffect, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

function EmailInput({ defaultEmails }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(defaultEmails);
  }, [defaultEmails]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        e.target.value = ''; // Clear the input field
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('Text')
      .split(/[,;\s]+/) // Split by comma, semicolon, or space
      .filter((tag) => tag.trim().length > 0);
    setTags((prevTags) => [...prevTags, ...pastedData]);
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap border rounded gap-2 max-w-52  md:max-w-72 ">
        <input
          type="text"
          className="flex p-2 flex-grow w-full input "
          placeholder="Add emails..."
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
        <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
          {tags.map((tag, index) => (
            <div key={index} className="flex bg-base-200 items-center  rounded rounded-full">
              <span className="ps-2 py-1">{tag}</span>
              <button className="p-2 rounded-full hover:bg-base-300" onClick={() => removeTag(index)}>
                <IoCloseSharp color="red" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmailInput;
